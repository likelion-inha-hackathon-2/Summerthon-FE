import React from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";


const LoginContainer = styled.div`
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
`;

const Sign_up_Text = styled.h1`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
`
const RetryButton = styled(Button)`
    width: 100%;
    position: relative;
    background-color: #0D99FF;
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
function Sign_up_Page ()  {
    return (
        <LoginContainer>
            <Sign_up_Text>회원가입이 완료되었습니다.</Sign_up_Text>
            <RetryButton text="다시 로그인하기"></RetryButton>
        </LoginContainer>
    )
}

export default Sign_up_Page;