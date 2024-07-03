import React from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";


const ArriveContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: #fff;
    border: 3px solid #e6e6e6;
    border-radius: 10px;
    width: 430px;
    max-width: 100%;
    height: 932px;
    padding: 0 20px;
    margin: 0 auto;
`

const ArriveButton = styled(Button)`
    width: 100%;
    position: relative;
    background-color: #0d99ff;
    padding: 10px 0;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    max-width: 300px;
    margin-top: 20px;
    &:hover {
    background-color: #007acc;
    } 
`

const Text = styled.h1`
    position: relative;
    bottom: 9px;
    margin-bottom: 40px;
    font-size: 34px;
    font-weight: bold;
`;



function ArriveLocation () {
    return (
        <ArriveContainer>
            <Text>어디로 가세요?</Text>
            <ArriveButton text="집"></ArriveButton>
            <ArriveButton text="인하대병원"></ArriveButton>
            <ArriveButton text="복지센터"></ArriveButton>
        </ArriveContainer>
    )
}


export default ArriveLocation;