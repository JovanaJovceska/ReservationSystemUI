import styled from "styled-components";
import { HiDesktopComputer } from 'react-icons/hi';
import { PiBuildings } from 'react-icons/pi';

export const Wrapper = styled.div`
    height: 100vh;
    background: linear-gradient(0.25turn, #93badd, #ebf8e1, #DDB693);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const Options = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

export const Option = styled.label``

export const Input = styled.input`
    display: none;
`

export const RadioBtn = styled.div`
    position: relative;
    width: 234px;
    height: 260px;
    margin: 10px;
    background-color: #010101;
    border: 4px solid transparent;
    border-radius: 10px;
    cursor: pointer;
`

export const Content = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const IconWrap = styled.div`
    width: 80px;
    height: 80px;
    margin: 20px 0;
    border-radius: 50%;
`

export const OIcon = styled(HiDesktopComputer)`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(0.25turn, #93badd, #DDB693);
    user-select: none;
`

export const SIcon = styled(PiBuildings)`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(0.25turn, #93badd, #DDB693);
    user-select: none;
`

export const H2 = styled.h2`
    color: #ffffff;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    text-transform: capitalize;
`

export const CheckIcon = styled.span`
    width: 30px;
    height: 30px;
    background-color: #1b1d28;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

export const CIcon = styled.span`
    display: inline-block;
    position: relative;
    width: 18px;
    height: 8px;
    margin-top: -2px;
    transform: rotate(-40deg);

    &::before {
        content: "";
        width: 3px;
        height: 100%;
        background-color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 10px;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.231);
        transform: scaleY(0);
        transform-origin: top;
        transition: all 0.2s ease-in-out;   
    }

    &::after {
        content: "";
        width: 100%;
        height: 3px;
        background-color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 10px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.231);
        transform: scaleX(0);
        transform-origin: left;
        transition: all 0.2s ease-in-out;
        transition-delay: 0.1s;
    }
`


export const Button = styled.button`
    background: #010101;
    color: #fff;
    text-decoration: none;
    padding: 12px 30px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
    outline: none;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #93badd;
    }

`

export const Text = styled.span`
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #fff;
    font-size: 14px;
`