import React, { useEffect, useState } from 'react'
import ajax from '../../services/fetchService'
import {useUser} from '../../UserProvider'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'

import {
  Container,
  Wrapper,
  Table,
  THead,
  TRow,
  THeading,
  TBody,
  TData,
  BtnReject
} from '../TableDesign/TableDesign'
import '../TableDesign/style.css'

const UserReservations = () => {
  const user = useUser();
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState("")
  
  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwtDecode(user.jwt);
      setUsername(decodedJwt.sub)

      if (username !== "") { 
        ajax(`http://localhost:8080/api/auth/${username}`, "GET", user.jwt).then((response) => {
        setUserId(response.userId)
          if (userId !== null) {
            setLoading(true)
    
            ajax(`http://localhost:8080/api/reserve/${userId}`, "GET", user.jwt).then(response => {
              setReservations(response)
              console.log(reservations)
            })
    
            setLoading(false)
          }
        })
      }
    }
  }, [user, user.jwt, username, userId])

  function cancelReservation(lectureUserId, lectureId, seats) {
    Swal.fire({
      title: '',
      text: `Are you sure that you want to cancel your reservation?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#93badd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const reqBody = {
          lectureId: lectureId,
          seats: seats
        }
    
        ajax(`http://localhost:8080/api/reserve/cancel/${lectureUserId}`, "POST", user.jwt, reqBody).then(response => {
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
              <THeading>Lecture Name</THeading>
              <THeading>Status</THeading>
              <THeading>Seats</THeading>
              <THeading></THeading>
            </TRow>
          </THead>
          {!loading && ( 
            <TBody>
              {reservations.map((reservation) => {
                return(
                  <TRow>
                    <TData>
                      {reservation.lectureName}
                    </TData>
                    <TData>
                      {reservation.status === "Approved" ? (
                        <div style={{color: "#4CBB17"}}>
                          {reservation.status}
                        </div>
                      ) : (
                        <div style={{color: "#D2042D"}}>
                          {reservation.status}
                        </div>
                      )}
                    </TData>
                    <TData>{reservation.seats}</TData>
                    <TData>
                      <BtnReject onClick={() => cancelReservation(reservation.lectureUserId, reservation.lectureId, reservation.seats)}>Cancel Reservation</BtnReject>
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

export default UserReservations