import styled from 'styled-components'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md'

export const Body = styled.body`
    background-color: #010606;
`

export const Section = styled.section`
    display: flex;
    align-items: center;
    color: rgb(75 85 99 / 1);

    @media screen and (min-width: 768px) {
        height: 100%;
    }
`

export const TabNavBar = styled.div`
    position: relative;
    padding-top: 20px;
    margin: 0px 10px 0px 40px;
`

export const TabNavigation = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: fit-content;
    background-color: #010606;
    margin: 0 auto;
`

export const TabMenu = styled.ul`
    color: #fff;
    list-style: none;
    background: #1a1e1e;
    max-width: 800px;
    padding: 10px;
    white-space: nowrap;
    border-bottom: 1px solid #1a1e1e;
    border-radius: 50px;
    box-shadow: 0 5px 25px rgb(2, 2, 2, 0.1);
    overflow-x: auto;
    user-select: none;

    &::-webkit-scrollbar {
        display: none;
    }
`

export const TabBtn = styled.li`
    color: #fff;
    display: inline-block;
    font-size: 1em;
    font-weight: 400;
    margin: 0 2px;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    user-select: none;
    transition: 0.3s ease;

    &:hover {
        background: #010606;
    }
`

export const LeftBtn = styled(MdArrowBackIos)`
    position: absolute;
    color: #fff;
    font-size: 3.8em;
    padding: 10px;
    cursor: pointer;
    left: 0;
    background: linear-gradient(to left, transparent, #010606 80%);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    display: none;
`

export const RightBtn = styled(MdArrowForwardIos)`
    position: absolute;
    color: #fff;
    font-size: 3.8em;
    padding: 10px;
    cursor: pointer;
    right: 0;
    background: linear-gradient(to right, transparent, #010606 80%);
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
`

export const Container = styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 96px;
    padding-bottom: 96px;
    margin-left: auto;
    margin-right: auto;
`

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -16px;
`

export const CardContainer = styled.div`
    padding: 16px;

    @media screen and (min-width: 640px) {
        width: 50%;
    }

    @media screen and (min-width: 1024px) {
        width: 33.333333%;
    }
`

export const Card = styled.div`
    height: 100%;
    border-width: 2px;
    border-color: rgb(229 231 235 / 1);
    border-opacity: 0.6;
    border-radius: 8px;
    overflow: hidden;
`

export const Image = styled.img`
    width: 100%;
    object-fit: cover;
    object-position: center;

    @media screen and (min-width: 1024px) {
        height: 288px;
    }

    @media screen and (min-width: 768px) {
        height: 192px;
    }
`

export const CardDetails = styled.div`
    padding: 24px;
`

export const Date = styled.h2`
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: #93badd;
    margin-bottom: 4px;
`

export const Title = styled.h1`
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #fff;
`

export const Description = styled.textarea`
    background-color: #010606;
    border: none;
    width: 100%;
    line-height: 1.625;
    margin-bottom: 12px;
    color: #eff1f3;
    cursor: pointer;
    resize: none;
`

export const Footer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Details = styled.a`
    align-items: center;
    text-decoration: none;
    cursor: pointer;

    background-image: linear-gradient(
        to right,
        #93badd,
        #94badd 50%,
        #fff 50%
    );
    background-size: 200% 100%;
    background-position: -100%;
    display: inline-block;
    padding: 5px 0;
    position: relative;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
        margin-bottom: 8px;
    }

    @media (min-width: 1024px) {
        margin-bottom: 0px;
    }

    &::before {
        content: '';
        background: #93badd;
        display: block;
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 3px;
        transition: all 0.3s ease-in-out;
    }

    &:hover {
        background-position: 0;
    }

    &:hover::before { 
        width:100%;
    }
`

export const Actions = styled.div`
    display: flex;
    align-items: center;
`

export const IconEdit = styled(AiFillEdit)`
    width: 30px;
    height: 30px;
    color: #fff;
    margin-right: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #93badd;
    }
`

export const IconDelete = styled(AiFillDelete)`
    width: 30px;
    height: 30px;
    color: #fff;
    margin-left: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #FF0000;
    }
`

export const ActionEdit = styled.div`
    border-right: 2px solid;
`

export const ActionDelete = styled.div`

`

export const Reservations = styled.button`
    background: #93badd;
    padding: 8px 18px;
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

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`

export const EventType = styled.span`
    text-transform: uppercase;
    font-weight: 700;
    color: #93badd;
`