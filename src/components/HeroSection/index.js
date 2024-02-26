import React, { useEffect, useState } from 'react'
import Video from '../../videos/video.mp4'
import { Button } from '../ButtonElement'
import { useUser } from '../../UserProvider'
import jwtDecode from 'jwt-decode'
import {
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
} from './HeroElements'

const HeroSection = () => {
    const [hover, setHover] = useState(false)
    const user = useUser()
    const [roles, setRoles] = useState(null)
    const [username, setUsername] = useState("")

    useEffect(() => {
      if (user && user.jwt) {
        const decodedJwt = jwtDecode(user.jwt);
        setUsername(decodedJwt.sub)
        setRoles(decodedJwt.authorities);
      }
    }, [user, user.jwt])

    const onHover = () => {
        setHover(!hover)   
    }
  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        {roles && roles[0] === "ROLE_ADMIN" ? (
          <>
            <HeroH1>Welcome Admin</HeroH1>
          </>
        ) : (
          roles && roles[0] === "ROLE_USER" ? (
            <>
              <HeroH1>Welcome {username}</HeroH1>
              <HeroP>You have the option to post your own events via our web application. 
                Simply click the button and provide us with the necessary details.</HeroP>
              <HeroBtnWrapper>
                {/* <Button 
                  to="/create" 
                  onMouseEnter={onHover} 
                  onMouseLeave={onHover}
                  primary="true" 
                  dark="true"
                  smooth={true} 
                  duration={500} 
                  spy={true} 
                  exact='true'
                  offset={-80}>
                    Add your event {hover ? <ArrowForward /> : <ArrowRight />}
                </Button> */}
                <Button 
                  to="/create" 
                  onMouseEnter={onHover} 
                  onMouseLeave={onHover}
                  primary="true" 
                  dark="true"
                  smooth={true} 
                  duration={500} 
                  spy={true} 
                  exact='true'
                  offset={-80}>
                    Add your event {hover ? <ArrowForward /> : <ArrowRight />}
                </Button>
              </HeroBtnWrapper>
            
            </>
          ) : (
            <HeroH1>Welcome text</HeroH1>
          )
        )}
        {/* <HeroP>Sign up for a new account today and receive $250 in credit towards your next payment</HeroP> */}
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection