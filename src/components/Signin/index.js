import React, { useState } from 'react'
import { GiMaterialsScience } from 'react-icons/gi'
import { 
    Container, 
    Form, 
    FormButton, 
    FormContent, 
    FormH1, 
    FormInput, 
    FormLabel, 
    FormWrap, 
    Icon, 
    Text,
    SignupLink,
    ArrowForward,
    ArrowRight
} from './SigninElements'

import { useUser } from "../../UserProvider"
import { useNavigate } from 'react-router-dom'
import { Button } from '../ButtonElement'

const SignIn = () => {
    const user = useUser()
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [hover, setHover] = useState(false)

    const onHover = () => {
      setHover(!hover)   
    }

    function sendLoginRequest() {
        setErrorMsg("");
        const reqBody = {
          username: username,
          password: password,
        };
    
        fetch("http://localhost:8080/api/auth/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(reqBody),
        })
          .then((response) => {
            if (response.status === 200) return response.text();
            else if (response.status === 401 || response.status === 403) {
              setErrorMsg("Invalid username or password");
            } else {
              setErrorMsg(
                "Something went wrong, try again later"
              );
            }
          })
          .then((data) => {
            if (data) {
                console.log(data)
               user.setJwt(data); 
               navigate("/");
            }
          });
      }
  return (
    <>
        <Container>
            <FormWrap>
                <FormContent>
                    <Form>
                        <FormH1>Sign in to your account</FormH1>
                        
                        <FormLabel htmlFor='for'>Username</FormLabel>
                        <FormInput 
                            type='email'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput 
                            type='password' 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        {errorMsg ? (
          
                          <Text style={{ color: "red"}}>
                            {errorMsg}
                          </Text>
                        ) : (
                          <></>
                        )}    

                        <Button onMouseEnter={onHover} 
                          onMouseLeave={onHover}
                          primary="true" 
                          dark="true"
                          smooth={true} 
                          duration={500} 
                          spy={true} 
                          exact='true'
                          offset={-80}
                          onClick={() => sendLoginRequest()}>Log In {hover ? <ArrowForward /> : <ArrowRight />}</Button>

                        <SignupLink to="/signup">Don't have an account? Sign up now</SignupLink>
                        
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    </>
  )
}

export default SignIn
