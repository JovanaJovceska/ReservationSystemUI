import React, { useEffect, useState } from 'react'
import { useUser } from '../../UserProvider'
import ajax from '../../services/fetchService'

import {
  Container,
  Wrapper,
  Table,
  THead,
  TRow,
  THeading,
  TBody,
  TData,
  BtnConfirm,
  BtnReject
} from '../TableDesign/TableDesign'
import '../TableDesign/style.css'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import dateFormat from '../dateFormat';

const UserEvents = () => {
  const user = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(null)
  const [lectures, setLectures] = useState([])

  useEffect(() => {
    setLoading(true)

    ajax('http://localhost:8080/api/lecture/userEvents', "GET", user.jwt).then(response => {
      setLectures(response)
    })

    setLoading(false)
  }, [])

  function postUserEvent(createdBy, lectureId, email) {
    Swal.fire({
      title: '',
      text: `Are you sure that you want to post ${createdBy} event?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#93badd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const reqBody = {
          email: email
        }
        ajax(`http://localhost:8080/api/lecture/confirm/${lectureId}`, "PUT", user.jwt, reqBody).then(response => {
          Swal.fire({
            title: '',
            text: response.response,
            icon: 'success',
            confirmButtonColor: '#93badd'
          }).then((result) => {
            window.location.reload()
          })
        })
      }
    })
  }

  function deleteUserEvent(createdBy, lectureId, email) {
    Swal.fire({
      title: '',
      text: `Are you sure that you want to delete ${createdBy}'s event?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#93badd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const reqBody = {
          email: email
        }
        ajax(`http://localhost:8080/api/lecture/decline/${lectureId}`, "DELETE", user.jwt, reqBody).then(response => {
          Swal.fire({
            title: '',
            text: response.response,
            icon: 'success',
            confirmButtonColor: '#93badd'
          }).then((result) => {
            window.location.reload()
          })
        })
      }
    })
  }

  return (
    <Container>
      <Wrapper>
        <Table>
          <THead>
            <TRow>
              <THeading>Name</THeading>
              <THeading>Description</THeading>
              <THeading>Available Seats</THeading>
              <THeading>Category</THeading>
              <THeading>Event Date</THeading>
              <THeading>Created By</THeading>
              <THeading>Actions</THeading>
            </TRow>
          </THead>
          {!loading && (
            <TBody>
              {lectures.map((lecture) => {
                return (
                  <TRow>
                    <TData>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                      <img src={lecture.fileUri} alt="" style={{width: '50px', height: '50px', paddingRight: '10px'}}/>
                        {lecture.name}
                      </div>
                    </TData>
                    <TData style={{wordBreak: 'break-word'}}>{lecture.description}</TData>
                    <TData>{lecture.availableSeats}</TData>
                    <TData>{lecture.category}</TData>
                    <TData>{dateFormat(lecture.dateOfEvent)}</TData>
                    <TData>{lecture.createdBy}</TData>
                    <TData>
                      <BtnConfirm onClick={() => postUserEvent(lecture.createdBy, lecture.lectureId, lecture.email)}>Confirm</BtnConfirm>
                      <BtnReject onClick={() => deleteUserEvent(lecture.createdBy, lecture.lectureId, lecture.email)}>Reject</BtnReject>
                    </TData>
                  </TRow>
                )
              })}
            </TBody>
          )}
        </Table>
      </Wrapper>
    </Container>
  )
}

export default UserEvents
