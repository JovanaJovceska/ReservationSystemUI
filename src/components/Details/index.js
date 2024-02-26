import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Body,
  BodyContainer,
  Container,
  ImgWrapper,
  Img,
  AboutWrapper,
  NameContainer,
  NameH1,
  Description,
  EventDate,
  SeatsContainer,
  SeatsWrap,
  Btn,
  NumSeats,
  BtnReserve,
  Category,
  Line,
  StatusDescription,
  Location,
  LocationContainer
} from './DetailElements'
import ajax from '../../services/fetchService';
import { useUser } from '../../UserProvider'
import Swal from 'sweetalert2'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const Details = () => {
  const user = useUser()
  const { lectureId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [availableSeats, setAvailableSeats] = useState(null)
  const [category, setCategory] = useState("")
  const [fileUri, setFileUri] = useState("")
  const [dateOfEvent, setDateOfEvent] = useState(null)
  const [username, setUsername] = useState("")
  const [eventType, setEventType] = useState("")

  const [seats, setSeats] = useState(0)  

  useEffect(() => {
    ajax(`http://localhost:8080/api/lecture/${lectureId}`, "GET", user.jwt).then(
      (lectureResponse) => {
        console.log(lectureResponse)
        setName(lectureResponse.name)
        setStatus(lectureResponse.status)
        setFileUri(lectureResponse.fileUri)
        setAvailableSeats(lectureResponse.availableSeats)
        setCategory(lectureResponse.category)
        setEventType(lectureResponse.eventType)

        const fDate = new Date(lectureResponse.dateOfEvent)
        setDateOfEvent((new Date(fDate.getFullYear(), fDate.getMonth(), fDate.getDate())).toDateString())

        setDescription(lectureResponse.description)
      }
    )

    if (user && user.jwt) {
      const decodedJwt = jwtDecode(user.jwt);
      setUsername(decodedJwt.sub)
    }
  }, [user, user.jwt])

  function handleBtnMinus() {
    if (seats === 0) {
      return
    } else {
      setSeats(seats-1);
    }
  }

  function handleBtnPlus() {
    if (seats === availableSeats) {
      return
    } else {
      setSeats(seats+1);
    }
  }

  function sendReservationReq() {
    Swal.fire({
      title: '',
      text: `Are you sure that you'd like to proceed with reserving ${seats} seats?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#93badd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const reqBody = {
          username: username,
          lecture_id: lectureId,
          seats: seats
        }
        ajax("http://localhost:8080/api/reserve", "POST", user.jwt, reqBody).then(response => {
          Swal.fire({
            title: 'Success',
            text: "Your request has been submitted. Once it's confirmed, you will receive an email notification",
            icon: 'success',
            confirmButtonColor: '#93badd'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/")
            }
          })
        })
      }
    })
  }

  return (
    <Body>
      <BodyContainer>
        <Container>
          <ImgWrapper>
            <Img src={fileUri} alt=""/>
          </ImgWrapper>
          <AboutWrapper>
            <NameContainer>
              <NameH1>{name}</NameH1>
              <Category>{category}</Category>
            </NameContainer>
            <EventDate>{dateOfEvent}</EventDate>
            <Description>{description}</Description>
            {eventType === "onsite" ? (
              <LocationContainer>
                <Location onClick={() => navigate(`/location/${lectureId}`)}>View Location</Location>
              </LocationContainer>
            ) : (
              <></>
            )}
            {status === "Available" ? (
              <>
                <Line />
                <SeatsContainer>
                  <SeatsWrap>
                    <Btn onClick={handleBtnMinus}>-</Btn>
                    <NumSeats>{seats}</NumSeats>
                    <Btn onClick={handleBtnPlus}>+</Btn>
                  </SeatsWrap>
                  {eventType === "online" ? (
                    <BtnReserve onClick={() => sendReservationReq()}>Reserve</BtnReserve>
                  ): (
                    <BtnReserve onClick={() => sendReservationReq()}>Reserve seats</BtnReserve>
                  )}
                </SeatsContainer>
              </>
            ) : (
              <>
                <Line />
                <StatusDescription>The event is booked.</StatusDescription>
              </>
            )} 
          </AboutWrapper>
        </Container>
      </BodyContainer>
    </Body>
  )
}

export default Details
