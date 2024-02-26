import React, { useState, useEffect, useRef } from 'react'
import { 
  Background,
  FormContent,
  FormWrap,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  TextArea,
  Wrap,
  ButtonLink,
  FormButton,
  Text
} from '../EditComponent/EditComponentElements'
import { useUser } from '../../UserProvider'
import jwtDecode from 'jwt-decode'
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const CreateEvent = () => {
  const navigate = useNavigate()
  const user = useUser()
  const [username, setUsername] = useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [category, setCategory] = useState("");
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [timeOfEvent, setTimeOfEvent] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  
  const { eventType } = useParams()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const locationRef = useRef()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    setUsernameFromJWT();
  }, [user.jwt]);

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: '',
    libraries: ['places']
  })

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const locationGeocoder = new window.google.maps.Geocoder();

  function setUsernameFromJWT() {
    if (user.jwt) {
      const decodedJwt = jwtDecode(user.jwt);
      setUsername(decodedJwt.sub)
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }; 

  async function getCoordinates() {
    if (locationRef !== "") {
      const locationResult = await geocodeAddress(locationRef.current.value, locationGeocoder);
      console.log(locationResult)
      const arr = locationResult.toString().split(',')
      setLatitude(arr[0].replace('(', ''))
      setLongitude(arr[1].replace('(', ''))
    }
  }

  function geocodeAddress(address, geocoder) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                resolve(location);
            } else {
                reject(status);
            }
        });
    });
  }

  function sendCreateRequest() {
    setErrorMsg("");
    const combinedDateTime = dateOfEvent + "T" + timeOfEvent
    if (eventType === "onsite") {
      getCoordinates()
      if (latitude !== null && longitude !== null) {
        const reqBody = {
            name: name,
            description: description,
            availableSeats: availableSeats,
            category: category,
            dateOfEvent: combinedDateTime,
            createdBy: username,
            eventType: eventType,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }
    
        if (file != null) {
            const formData = new FormData();
            formData.append('file', file);
            
            axios.post("http://localhost:8080/api/lecture", JSON.stringify(reqBody), {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response1 => {
                formData.append('lectureId', parseInt(response1.data.id)) 
                return axios.post('http://localhost:8080/api/photo', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
            }).then(response2 => {
              username === "admin" ? (
                Swal.fire({
                  title: 'Success',
                  text: "You successfully posted an event!",
                  icon: 'success',
                  confirmButtonColor: '#93badd'
                }).then((result) => {
                    navigate("/")
                })
              ) : (
                Swal.fire({
                  title: 'Success',
                  text: "Your request has been submitted. Once it's confirmed, you will receive an email notification",
                  icon: 'success',
                  confirmButtonColor: '#93badd'
                }).then((result) => {
                    navigate("/")
                })
              )
            })
            .catch(error => {
                console.log(error)
             });
        } else {
            setErrorMsg("Please upload a photo")
        } 
      } 
    } else {
      const reqBody = {
        name: name,
        description: description,
        availableSeats: availableSeats,
        category: category,
        dateOfEvent: combinedDateTime,
        createdBy: username,
        eventType: eventType,
        latitude: latitude,
        longitude: longitude
      }

      if (file != null) {
        const formData = new FormData();
        formData.append('file', file);
        
        axios.post("http://localhost:8080/api/lecture", JSON.stringify(reqBody), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`
            }
        }).then(response1 => {
            formData.append('lectureId', parseInt(response1.data.id)) 
            return axios.post('http://localhost:8080/api/photo', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.jwt}`
              },
            })
        }).then(response2 => {
          username === "admin" ? (
            Swal.fire({
              title: 'Success',
              text: "You successfully posted an event!",
              icon: 'success',
              confirmButtonColor: '#93badd'
            }).then((result) => {
                navigate("/")
            })
          ) : (
            Swal.fire({
              title: 'Success',
              text: "Your request has been submitted. Once it's confirmed, you will receive an email notification",
              icon: 'success',
              confirmButtonColor: '#93badd'
            }).then((result) => {
                navigate("/")
            })
          )
        })
        .catch(error => {
            console.log(error)
         });
      } else {
        setErrorMsg("Please upload a photo")
    } 
  }
  }

  return (
    <Background>
      <FormWrap>
        <FormContent>
          <Form>
            <FormH1>Create Event</FormH1>

            <FormLabel>Name</FormLabel>
            <FormInput 
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />

            <FormLabel>Description</FormLabel>
            <TextArea 
              rows="4" cols="25"
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)} />

            {eventType === "online" ? (
              <>
                <FormLabel>Participants</FormLabel>
                <FormInput 
                  type='number'
                  value={availableSeats}
                  onChange={(e) => setAvailableSeats(e.target.value)}
                />
              </>
            ) : (
              <>
                <FormLabel>Available Seats</FormLabel>
                <FormInput 
                  type='number'
                  value={availableSeats}
                  onChange={(e) => setAvailableSeats(e.target.value)}
                />

                <FormLabel>Location</FormLabel>
                <Autocomplete>
                  <FormInput 
                    style={{width: '100%'}}
                    type='text' 
                    ref={locationRef}
                  />
                </Autocomplete>
              </>
            )}

            <FormLabel>Category</FormLabel>
            <FormInput
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)} />

              <FormLabel>Event Date</FormLabel>   
              <FormInput 
                type='date'
                required
                value={dateOfEvent}
                onChange={(e) => setDateOfEvent(e.target.value)} />

              <FormLabel>Event Time</FormLabel>
              <FormInput
                type='time'
                value={timeOfEvent}
                onChange={(e) => setTimeOfEvent(e.target.value)} />
                        
            <FormLabel>Upload Photo</FormLabel>
            <input className='fileInput' type='file' onChange={handleFileChange} />

            {errorMsg ? (
              <Text style={{ color: "red"}}>
                {errorMsg}
              </Text>
            ) : (
              <></>
            )}  

            <Wrap>
              <ButtonLink to="/">Cancel</ButtonLink>
              <FormButton type='button' onClick={() => sendCreateRequest()} >Submit</FormButton>
            </Wrap>
          </Form>
        </FormContent>
      </FormWrap>
    </Background>
  )
}

export default CreateEvent
