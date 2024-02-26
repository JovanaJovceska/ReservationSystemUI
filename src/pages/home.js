import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import { useUser } from '../UserProvider'
import jwtDecode from 'jwt-decode'
import CardSlider from '../components/CardSlider'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState("")

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [roles, setRoles] = useState([]);
    const user = useUser();

    useEffect(() => {
      setRoles(getRolesFromJWT());
    }, [user.jwt]);

    function getRolesFromJWT() {
      if (user.jwt) {
        const decodedJwt = jwtDecode(user.jwt);
        setUsername(decodedJwt.sub)
        return decodedJwt.authorities;
      }
      return [];
    }

  return (
    <>
      {/* <Sidebar isOpen={isOpen} toggle={toggle}/> */}
        <Navbar toggle={toggle}/>
        <HeroSection />
      <CardSlider />
    </>
  )
}

export default Home