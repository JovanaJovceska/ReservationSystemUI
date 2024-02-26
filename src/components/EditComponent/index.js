import React, {useEffect, useState, useRef} from 'react'
import './style.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { useUser } from '../../UserProvider'
import { useNavigate, useParams } from 'react-router-dom';
import ajax from '../../services/fetchService';
import axios from 'axios';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

import { Background,
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Wrap,
    ButtonLink,
    TextArea
} from './EditComponentElements'

const EditComponent = () => {
    const user = useUser()
    const navigate = useNavigate()
    const { lectureId } = useParams()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [availableSeats, setAvailableSeats] = useState(null)
    const [category, setCategory] = useState("")
    const [dateOfEvent, setDateOfEvent] = useState(null)
    const [timeOfEvent, setTimeOfEvent] = useState("")
    const [eventType, setEventType] = useState("")
    /** @type React.MutableRefObject<HTMLInputElement> */
    const locationRef = useRef()
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [oldLat, setOldLat] = useState(null)
    const [oldLong, setOldLong] = useState(null)
    const [file, setFile] = useState(null)
    const [photoId, setPhotoId] = useState(null)

    const [edited, setEdited] = useState(false)
    
    useEffect(() => {
        ajax(`http://localhost:8080/api/lecture/${lectureId}`, "GET", user.jwt).then(
            (lectureResponse) => {
                setName(lectureResponse.name)
                setDescription(lectureResponse.description)
                setAvailableSeats(lectureResponse.availableSeats)
                setCategory(lectureResponse.category)
                setPhotoId(lectureResponse.photoId)
                setEventType(lectureResponse.eventType)
                setOldLat(lectureResponse.latitude)
                setOldLong(lectureResponse.longitude)
                
                const localDateTime = lectureResponse.dateOfEvent
                const [date, time] = localDateTime.split("T")
                const uDate = new Date(date)
                setDateOfEvent(new Date(uDate.getFullYear(), uDate.getMonth(), uDate.getDate()))
                setTimeOfEvent(time)
            }
        )
    }, [])

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyCjL7pZtgKSIvb2YH2DORBEY44_cDQLyIs',
        libraries: ['places']
    })

    if (!isLoaded) {
        // Google Maps JavaScript API is not yet loaded
        return <div>Loading...</div>;
    }

    const locationGeocoder = new window.google.maps.Geocoder();


    const handleDateChange = (date) => {
        setDateOfEvent(date);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    async function getCoordinates() {
        if (locationRef !== "") {
          const locationResult = await geocodeAddress(locationRef.current.value, locationGeocoder);
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

    function updateLecture() {
        const year = dateOfEvent.getFullYear();
        const month = String(dateOfEvent.getMonth() + 1).padStart(2, '0');
        const day = String(dateOfEvent.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const combinedDateTime = formattedDate + "T" + timeOfEvent
        if (eventType === "onsite") {
            if (edited) {
                getCoordinates()
                if (latitude !== null && longitude !== null) {
                    const reqBody = {
                        name: name,
                        description: description,
                        availableSeats: availableSeats,
                        category: category,
                        dateOfEvent: combinedDateTime,
                        eventType: eventType,
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude)
                    }
                    axios.put(`http://localhost:8080/api/lecture/${lectureId}`, JSON.stringify(reqBody), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.jwt}`
                        }
                    }).then(response => {
                        if (file != null) {
                            const formData = new FormData();
                            formData.append('file', file);
                            return axios.put(`http://localhost:8080/api/photo/${photoId}`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            }).then(response2 => {
                                navigate("/")  
                            }).catch(error => {
                                console.log(error)
                            });
                        } else {
                            navigate("/")
                        }
                    })
                }
            } else {
                const reqBody = {
                    name: name,
                    description: description,
                    availableSeats: availableSeats,
                    category: category,
                    dateOfEvent: combinedDateTime,
                    eventType: eventType,
                    latitude: oldLat,
                    longitude: oldLong
                }
                axios.put(`http://localhost:8080/api/lecture/${lectureId}`, JSON.stringify(reqBody), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`
                    }
                }).then(response => {
                    if (file != null) {
                        const formData = new FormData();
                        formData.append('file', file);
                        return axios.put(`http://localhost:8080/api/photo/${photoId}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }).then(response2 => {
                            navigate("/")  
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        navigate("/")
                    }
                })
            }
        } else {
            const reqBody = {
                name: name,
                description: description,
                availableSeats: availableSeats,
                category: category,
                dateOfEvent: combinedDateTime,
                eventType: eventType,
                latitude: oldLat,
                longitude: oldLong
            }
            axios.put(`http://localhost:8080/api/lecture/${lectureId}`, JSON.stringify(reqBody), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.jwt}`
                }
            }).then(response => {
                if (file != null) {
                    const formData = new FormData();
                    formData.append('file', file);
                    return axios.put(`http://localhost:8080/api/photo/${photoId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then(response2 => {
                        navigate("/")  
                    }).catch(error => {
                        console.log(error)
                    });
                } else {
                    navigate("/")
                }
            })
        }
    } 

  return (
        <Background>
            <FormWrap>
                <FormContent>
                    <Form>
                        <FormH1>Edit</FormH1>

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
                                        onChange={() => setEdited(true)}
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
                        <DatePicker className='datePicker'
                            selected={dateOfEvent} 
                            dateFormat="dd-MM-yyyy"
                            onChange={handleDateChange}
                        />

                        <FormLabel>Event Time</FormLabel>
                        <FormInput
                            type='time'
                            value={timeOfEvent}
                            onChange={(e) => setTimeOfEvent(e.target.value)} />
                        
                        <FormLabel>Upload Photo</FormLabel>
                        <input className='fileInput' type='file' onChange={handleFileChange}/>

                        <Wrap>
                        
                        <ButtonLink to="/">Cancel</ButtonLink>
                        <FormButton type='button' onClick={() => updateLecture()}>Submit</FormButton>
                        </Wrap>

                       
                    </Form>
                </FormContent>

            </FormWrap>
        </Background>
    
  )
}

export default EditComponent
