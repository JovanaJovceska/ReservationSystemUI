import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ajax from '../../services/fetchService'
import Swal from 'sweetalert2'

import { 
    Container, 
    Heading,
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
import { useUser } from '../../UserProvider'

const EventReservationsRequests = () => {
    const user = useUser()
    const { lectureId } = useParams()
    const [requests, setRequests] = useState([])
    const [lectureName, setLectureName] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    
        ajax(`http://localhost:8080/api/reserve/requests/${lectureId}`, "GET", user.jwt).then(response => {   
          setRequests(response)
        })
    
        setLoading(false)
    }, [])

    useEffect(() => {
      ajax(`http://localhost:8080/api/lecture/${lectureId}`, "GET", user.jwt).then(
      (lectureResponse) => {
        setLectureName(lectureResponse.name)
      })
    })

    function confirmReservationRequest(lectureUserId, lectureId, email) {
        const reqBody = {
          lectureId: lectureId,
          email: email
        }
        ajax(`http://localhost:8080/api/reserve/${lectureUserId}`, "POST", user.jwt, reqBody).then(response => {
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
    
      function deleteReservationRequest(lectureUserId, email) {
        const reqBody = {
          email: email
        }
        ajax(`http://localhost:8080/api/reserve/${lectureUserId}`, "DELETE", user.jwt, reqBody).then(response => {
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

  return (
    <Container>
        <Heading>Reservation Requests For {lectureName}</Heading>
        <Wrapper>
            <Table>
                <THead>
                    <TRow>
                        <THeading>Email</THeading>
                        <THeading>Num. Seats</THeading>
                        <THeading>Actions</THeading>
                    </TRow>
                </THead>
                {!loading && (
                    <TBody>
                        {requests.map((request) => {
                            return (
                                <TRow>
                                    <TData>{request.email}</TData>
                                    <TData>{request.seats}</TData>
                                    <TData>
                                        <BtnConfirm onClick={() => confirmReservationRequest(request.lectureUserId, request.lectureId, request.email)}>Confirm</BtnConfirm>
                                        <BtnReject onClick={() => deleteReservationRequest(request.lectureUserId, request.email)}>Reject</BtnReject>
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

export default EventReservationsRequests
