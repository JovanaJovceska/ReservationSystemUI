import React, {useEffect, useState} from 'react'
import ajax from '../../services/fetchService'
import { Button } from '../ButtonElement'
import { ArrowForward, ArrowRight } from './EventReservationsElements'
import { 
    Container, 
    Heading, 
    THead, 
    Table, 
    Wrapper,
    TRow,
    THeading,
    TBody,
    TData
} from '../TableDesign/TableDesign'

import { useUser } from '../../UserProvider'
import { useNavigate, useParams } from 'react-router-dom'

const EventReservations = () => {
    const user = useUser()
    const navigate = useNavigate()
    const { lectureId } = useParams()
    const [lectureName, setLectureName] = useState("")
    const [loading, setLoading] = useState(false)
    const [reservations, setReservations] = useState([])
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)   
    }

    useEffect(() => {
        ajax(`http://localhost:8080/api/lecture/${lectureId}`, "GET", user.jwt).then((lectureResponse) => {
          setLectureName(lectureResponse.name)
        })
    }, [])

    useEffect(() => {
        setLoading(true)

        ajax(`http://localhost:8080/api/reserve/reservations/${lectureId}`, "GET", user.jwt).then(response => {   
          setReservations(response)
        })

        setLoading(false)
    }, [])


  return (
    <Container>
        <Heading>All Reservations for {lectureName}</Heading>
            <Button onMouseEnter={onHover} 
                onMouseLeave={onHover}
                primary="true" 
                dark="true"
                smooth={true} 
                duration={500} 
                spy={true} 
                exact='true'
                offset={-80}
                style={{width: '15%', marginLeft: 'auto', marginRight: 'auto'}}
                to={`/requests/${lectureId}`}>View Requests {hover ? <ArrowForward /> : <ArrowRight />}</Button>
        <Wrapper>
            <Table>
                <THead>
                    <TRow>
                        <THeading>Email</THeading>
                        <THeading>Num. Seats</THeading>
                    </TRow>
                </THead>
                {!loading && (
                    <TBody>
                        {reservations.map((reservation) => {
                            return (
                                <TRow>
                                    <TData>{reservation.email}</TData>
                                    <TData>{reservation.seats}</TData>
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

export default EventReservations
