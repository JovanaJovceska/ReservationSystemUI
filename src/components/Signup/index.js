import React, { useState } from 'react'
import { GiMaterialsScience } from 'react-icons/gi'
import Swal from 'sweetalert2'
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
    ArrowForward,
    ArrowRight,
    SigninLink
} from './SignupElements'

import { useUser } from "../../UserProvider"
import { useNavigate } from 'react-router-dom'
import { Button } from '../ButtonElement'

const SignUp = () => {
    const user = useUser()
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [hover, setHover] = useState(false)

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
  
    const handleChange = event => {
      if (!isValidEmail(event.target.value)) {
        setErrorMsg('Please enter a valid email address');
      } else {
        setErrorMsg(null);
      }
  
      setEmail(event.target.value);
    };

    const onHover = () => {
      setHover(!hover)   
    }

    function sendRegisterRequest() {
        setErrorMsg("");
        const reqBody = {
          name: name,
          username: username,
          email: email,
          password: password,
        };
    
        fetch("http://localhost:8080/api/auth/register", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(reqBody),
        })
          .then((response) => {
            if (response.status === 200) return response.text();
            else {
              setErrorMsg(
                "Something went wrong, try again later"
              );
            }
          })
          .then((data) => {
            if (data) {
              console.log(data)
              user.setJwt(data);
              Swal.fire(
                '',
                'You successfully created an account!',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  navigate("/signin");
                }
            })
               
            }
          });
      }
  return (
    <>
        <Container>
            <FormWrap>
                <FormContent>
                    <Form>
                        <FormH1>Create a new account</FormH1>
                        
                        <FormLabel htmlFor='for'>Name</FormLabel>
                        <FormInput 
                            type='text'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <FormLabel htmlFor='for'>Username</FormLabel>
                        <FormInput 
                            type='text'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />

                        <FormLabel>Email</FormLabel>
                        <FormInput
                          type='email'
                          required
                          onChange={handleChange}
                          value={email}/>
                        
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
                          onClick={() => sendRegisterRequest()}>Sign Up {hover ? <ArrowForward /> : <ArrowRight />}</Button>

                         <SigninLink to="/signin">Already have an account? Sign in now</SigninLink>
                        
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    </>
  )
}

export default SignUp
