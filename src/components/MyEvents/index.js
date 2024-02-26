import React, { useState, useEffect } from 'react'
import { useUser } from '../../UserProvider'
import jwtDecode from 'jwt-decode'
import ajax from '../../services/fetchService'
import dateFormat from '../dateFormat';

import { 
    Container, 
    THeading, 
    Table, 
    Wrapper,
    THead,
    TRow,
    TBody,
    TData,
    BtnReject
} from '../TableDesign/TableDesign'
import '../TableDesign/style.css'

import Swal from 'sweetalert2'

const MyEvents = () => {
    const user = useUser()
    const [username, setUsername] = useState("")
    const [lectures, setLectures] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        if (user && user.jwt) {
          const decodedJwt = jwtDecode(user.jwt);
          setUsername(decodedJwt.sub)
        }
    }, [user, user.jwt])

    useEffect(() => {
        if (username !== "") {
            setLoading(true)

            ajax(`http://localhost:8080/api/lecture/myEvents/${username}`, "GET", user.jwt).then(response => {
              setLectures(response)
            })

            setLoading(false)
        }
    }, [user.jwt, username])

    function cancelRequest(lectureId) {
        Swal.fire({
            title: '',
            text: `Are you sure that you want to cancel your request?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#93badd',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                ajax(`http://localhost:8080/api/lecture/cancel/${lectureId}`, "DELETE", user.jwt).then(response => {
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
                                    <TData>
                                        <BtnReject onClick={() => cancelRequest(lecture.lectureId)}>Cancel </BtnReject>
                                        {/* Request</BtnReject> */}
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

export default MyEvents
