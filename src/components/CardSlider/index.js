import React, { useState, useEffect } from 'react'
import { 
    Body,
    Section,
    Container,
    Wrapper,
    CardContainer,
    Card,
    Image,
    CardDetails,
    Date,
    Title,
    Description,
    Footer,
    Details,
    Actions,
    IconEdit,
    IconDelete,
    ActionEdit,
    ActionDelete,
    Reservations,
    TabNavBar,
    TabNavigation,
    TabMenu,
    TabBtn,
    LeftBtn,
    RightBtn,
    Header,
    EventType
} from './CardSliderElements'
import ajax from '../../services/fetchService'
import { useUser } from '../../UserProvider'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import './style.css'
import dateFormat from '../dateFormat';

const CardSlider = () => {
    let navigate = useNavigate()
    const user = useUser()
    const [username, setUsername] = useState("")
    const [roles, setRoles] = useState([]);
    const [categories, setCategories] = useState(null)
    const [lectures, setLectures] = useState(null)
    const [activeTab, setActiveTab] = useState(false);
    const [defaultTab, setDefaultTab] = useState(true);

    const handleTabClick = (index, category) => {
        setActiveTab(index);
        setDefaultTab(false);
        showEventsByCategory(category)
    };

    const handleDefClick = () => {
        setActiveTab(false);
        setDefaultTab(true);
        ajax("http://localhost:8080/api/lecture", "GET", user.jwt).then(lecturesData => {   
            setLectures(lecturesData)
        })
    }

    const tabMenu = document.getElementById("tabMenu")
    const btnLeft = document.getElementById("btnLeft")
    const btnRight = document.getElementById("btnRight")

    useEffect(() => {
        ajax("http://localhost:8080/api/lecture/categories", "GET").then(categoriesData => {
            setCategories(categoriesData)
            ajax("http://localhost:8080/api/lecture", "GET", user.jwt).then(lecturesData => {   
              setLectures(lecturesData)
            })
        })

      if (user && user.jwt) {
        const decodedJwt = jwtDecode(user.jwt);
        setUsername(decodedJwt.sub)
        setRoles(decodedJwt.authorities);
      }
    }, [user, user.jwt]) 

    function handleRightBtnClick() {
        tabMenu.scrollLeft += 150;
        setTimeout(() => IconVisibility(), 50)
    }

    function handleLeftBtnClick() {
        tabMenu.scrollLeft -= 150;
        setTimeout(() => IconVisibility(), 50);
    }

    const IconVisibility = () => {
        let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);

        let scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;

        btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
        btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
    }

    function editLecture(lecture) {
        navigate(`/lectures/${lecture.lectureId}`)
    } 

    const handleClick = (lectureId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#93badd',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/lecture/${lectureId}`).then(response => {
                    Swal.fire(
                        `Deleted!`,
                        'Your file has been deleted.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()
                        }
                    })
                }).catch(error => {
                    console.log(error)
                });
            }
        })
    }

    function showEventsByCategory(category) {
        ajax(`http://localhost:8080/api/lecture/categories/${category}`, "GET").then((lectureData) => {
            setLectures(lectureData)
        })
    }

  return (
    <Body>
        <TabNavBar>
            <TabNavigation>
                <LeftBtn id='btnLeft' onClick={() => handleLeftBtnClick()}>&lt;</LeftBtn>
                <RightBtn id='btnRight' onClick={() => handleRightBtnClick()}>&gt;</RightBtn>
                <TabMenu id='tabMenu'>
                    <TabBtn className={defaultTab ? 'active' : ''} onClick={() => handleDefClick()}>All</TabBtn>
                    {categories ? (
                        <>
                            {categories.map((category, index) => {
                                return (
                                    <TabBtn key={index} className={index === activeTab ? 'active' : ''} onClick={() => handleTabClick(index, category)}>{category}</TabBtn>
                                    /* showEventsByCategory(category) */
                                )
                            })}
                        </>
                    ) : (
                        <></>
                    )}
                </TabMenu>
            </TabNavigation>
        </TabNavBar>
        <Section>
            <Container>
                <Wrapper>
                    {lectures ? (
                        <>
                            {lectures.map((lecture) => {
                                return (
                                    <CardContainer key={lecture.lectureId}>
                                        <Card>
                                            <Image src={lecture.fileUri} alt=""/>
                                            <CardDetails>
                                                <Header>
                                                    <Date>{dateFormat(lecture.dateOfEvent)}</Date>
                                                    <EventType>{lecture.eventType}</EventType>
                                                </Header>
                                                <Title>{lecture.name}</Title>
                                                <Description rows="4" cols="25">{lecture.description}</Description>
                                                <Footer>
                                                    {username && username === lecture.createdBy ? (
                                                        <>
                                                            <Reservations onClick={() => navigate(`/reservations/${lecture.lectureId}`)}>View Reservations</Reservations>
                                                            <Actions>
                                                                <ActionEdit>
                                                                    <IconEdit onClick={() => {editLecture(lecture)}}/>
                                                                </ActionEdit>
                                                                <ActionDelete>
                                                                    <IconDelete onClick={() => {handleClick(lecture.lectureId)}}/>
                                                                </ActionDelete>
                                                            </Actions>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Details onClick={() => navigate(`/details/${lecture.lectureId}`)}>Read More</Details>
                                                        </>
                                                    )}
                                                </Footer>
                                            </CardDetails>
                                        </Card>
                                    </CardContainer>
                                )
                            })}
                        </>
                    ) : (
                        <></>
                    )}
                </Wrapper>
            </Container>
        </Section>
    </Body>
  )
}

export default CardSlider
