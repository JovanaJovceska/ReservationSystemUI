import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { GiMaterialsScience } from 'react-icons/gi'
import { animateScroll as scroll } from 'react-scroll'
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserProvider"
import jwtDecode from 'jwt-decode'

import { 
    Nav, 
    NavbarContainer, 
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink,
    NavLinksR
} from './NavbarElements'

const Navbar = ({ toggle }) => {
    const navigate = useNavigate();
    const user = useUser();

    const [scrollNav, setScrollNav] = useState(false)
    const [roles, setRoles] = useState(null)
    const [username, setUsername] = useState("")

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        if (user && user.jwt) {
          const decodedJwt = jwtDecode(user.jwt);
          setUsername(decodedJwt.sub)
          setRoles(decodedJwt.authorities);
        }
    }, [user, user.jwt])
  

    const logout = () => {
        user.setJwt(null)
        window.location.reload()
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    const toggleHome = () => {
        scroll.scrollToTop()
    }

  return (
    <>
        <Nav scrollNav={scrollNav}>
            <NavbarContainer>
                <NavLogo to="/" onClick={toggleHome}>
                    <GiMaterialsScience />
                </NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    {roles && roles[0] === "ROLE_USER" ? (
                        <>
                            <NavItem>
                                <NavLinksR to="/reservations">My Reservations</NavLinksR>
                            </NavItem>
                            <NavItem>
                                <NavLinksR to="/myevents">My Event Requests</NavLinksR>
                            </NavItem>
                        </>
                    ) : (
                        roles && roles[0] === "ROLE_ADMIN" ? (
                            <>
                                <NavItem>
                                    <NavLinksR to="/userEvents">User Events</NavLinksR>
                                </NavItem>
                                <NavLinksR 
                                    to="/create"
                                    >Create</NavLinksR>
                            </>
                        ) : (
                            <></>
                        )
                    )}
                    <NavItem>
                        <NavLinks 
                            to="discover"
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}>Discover</NavLinks>
                    </NavItem>
                </NavMenu>

                {user && user.jwt ? (
                    <NavBtn>
                        <NavBtnLink onClick={logout}>Log out</NavBtnLink>
                    </NavBtn>
                ) : (
                    <NavBtn>
                        <NavBtnLink to="/signin">Sign In</NavBtnLink>
                    </NavBtn>
                )}
                
            </NavbarContainer>
        </Nav>
    </>
  )
}

export default Navbar
