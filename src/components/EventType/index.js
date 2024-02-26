import React, { useState } from 'react'
import {
  Wrapper,
  Options,
  Option,
  Input,
  RadioBtn,
  Content,
  IconWrap,
  OIcon,
  SIcon,
  H2,
  CheckIcon,
  CIcon,
  Button,
  Text
} from './EventTypeElements'
import './style.css'
import { useNavigate } from 'react-router-dom'

const EventType = () => {
  const [eventType, setEventType] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate()

  function toCreate() {
    if (eventType) {
      navigate(`${eventType}`)
    } else {
      setErrorMsg("Please choose an event type")
    }
  }

  return (
    <Wrapper>
      <Options>
        
        <Option>
          <Input className='radio-input' name="radio" type="radio" id="online" 
            onClick={() => {
              setEventType("online")
              setErrorMsg(null)}}/>
          <RadioBtn className='radio-btn'>
            <Content>
              <IconWrap>
                <OIcon />
              </IconWrap>
              <H2>Online</H2>
              <CheckIcon className='check-icon'>
                <CIcon className='icon'></CIcon>
              </CheckIcon>
            </Content>
          </RadioBtn>
        </Option>

        <Option>
          <Input className='radio-input' name="radio" type="radio" id="onsite" 
            onClick={() => {
              setEventType("onsite")
              setErrorMsg(null)}}/>
          <RadioBtn className='radio-btn'>
            <Content>
              <IconWrap>
                <SIcon />
              </IconWrap>
              <H2>Onsite</H2>
              <CheckIcon className='check-icon'>
                <CIcon className='icon'></CIcon>
              </CheckIcon>
            </Content>
          </RadioBtn>
        </Option>

      </Options>

      <Button onClick={() => toCreate()}>Next</Button>

      {errorMsg ? (
        <Text style={{ color: "red"}}>
          {errorMsg}
        </Text>
      ) : (
        <></>
      )}
    </Wrapper>
  )
}

export default EventType
