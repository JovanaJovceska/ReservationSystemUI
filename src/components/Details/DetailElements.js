import styled from "styled-components";

export const Body = styled.body`
    background: #010606;
    min-height: 100vh;    
`
export const BodyContainer = styled.div`
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4rem;

    @media screen and (min-width: 1024px) {
        flex-direction: row;
        align-items: center;
    }
`

export const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media screen and (min-width: 1024px) {
        width: 50%;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 0.75rem;
`

export const AboutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media screen and (min-width: 1024px) {
        width: 50%;
    }
`

export const NameContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Category = styled.div`
    padding: 10px; 
    padding-right: 10px;
    color: #fff; 
    border-radius: 20px;
    width: fit-content; 
    font-weight: 600;
    background-color: rgb(147, 186, 221);
`

export const NameH1 = styled.h1`
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #fff;
`

export const Description = styled.p`
    color: #fff;
`

export const EventDate = styled.h6`
    padding-top: 0px;
    font-size: 1rem;
    font-weight: 600;
    color: rgb(147, 186, 221);
`

export const SeatsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
`

export const SeatsWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const AvSeats = styled.p`
    font-size: 1.5rem;
    color: #fff;
`

export const Btn = styled.button`
    background-color: #E2E8F0;
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    border-radius: 0.5rem;
    color: rgb(147, 186, 221);
    font-size: 1.875rem;
    line-height: 2.25rem;
    border: none;
    transition: all 0.3s ease-in-out;

    &:hover{
        transition: all 0.3s ease-in-out;
        background: #fff;
        cursor: pointer;
    }
`

export const NumSeats = styled.span`
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-radius: 0.5rem;
    color: #fff;
`

export const BtnReserve = styled.button`
    background-color: rgb(147, 186, 221);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem 4rem 0.75rem 4rem;
    border-radius: 0.75rem;
    border: none;
    height: 100%;
    transition: all 0.3s ease-in-out;

    &:hover{
        transition: all 0.3s ease-in-out;
        background: #d5e4f2;
        cursor: pointer;
    }
`

export const Line = styled.hr``

export const StatusDescription = styled.p`
    color: #fff;
    font-style: italic;
`

export const Location = styled.a`
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
        width: 100%;
    }
`

export const LocationContainer = styled.div`
    width: fit-content;
`