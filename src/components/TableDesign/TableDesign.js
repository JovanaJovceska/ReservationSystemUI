import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #010606;
`

export const Heading = styled.h1`
    color: #93badd;
    margin-left: auto;
    margin-right: auto;
    margin-top: 22px;
    margin-bottom: 22px;
    font-size: 22px;
    line-height: 22px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
`

export const Wrapper = styled.div`
    flex-grow: 1;
    overflow: auto;
`

export const Table = styled.table`
    position: relative;
    width: 100%;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
`

export const THead = styled.thead``

export const TRow = styled.tr`
    margin: 0;
    padding: 0;
    background-color: #010606;
`

export const THeading = styled.th`
    position: sticky;
    top: 0px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #93badd;
    background-color: #010606;
`

export const TBody = styled.tbody`
    background-color: #010606;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px; 
        background-color: #010606;
  }
`

export const TData = styled.td`
  padding: 16px 24px 16px 24px;
  text-align: center;
  color: #fff;
  margin: 0;
`

export const BtnConfirm = styled.a`
    background: #93badd;
    padding: 8px 20px;
    border-radius: 50px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #000;
    }
`

export const BtnReject = styled.a`
    background: #D2042D;
    padding: 8px 20px;
    border-radius: 50px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-left: 5px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #D2042D;
    }
`