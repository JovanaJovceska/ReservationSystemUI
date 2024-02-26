import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Background = styled.div` 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    max-width: 100vw;
    min-height: 100vh;
    background: linear-gradient(0.25turn, #93badd, #ebf8e1, #DDB693);
`

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

export const Form = styled.div`
    background: #010101;
    max-width: 500px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 40px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen and (max-width: 780px) {
        max-width: 400px;
    }

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`

export const FormH1 = styled.h1`
    color: #93badd;
    font-size: 20px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 10px;
    text-align: center;
`

export const FormLabel = styled.label`
    margin-bottom: 4px;
    font-size: 14px;
    color: #fff;
`
export const FormInput = styled.input`
    padding: 10px 10px;
    margin-bottom: 6px;
    border: none;
    border-radius: 4px;
`

export const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
`
export const FormButton = styled.button`
    background: #93badd;
    padding: 10px 22px;
    border-radius: 50px;
    font-size: 16px;
    color: #010606;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const ButtonLink = styled(Link)`
    background: red;
    color: #fff;
    text-decoration: none;
    padding: 10px 22px;
    border-radius: 50px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }

`

export const TextArea = styled.textarea`
    padding: 10px 10px;
    margin-bottom: 12px;
    border: none;
    border-radius: 4px;
    resize: none;
`

export const Text = styled.span`
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #fff;
    font-size: 14px;
`