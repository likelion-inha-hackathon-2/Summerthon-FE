import React from "react";
import styled from "styled-components";
import Image from "../components/Image/Image";
import { IconArrow } from "../assets/icon";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 19px 20px 27px 20px;
`;

const Header = styled.div`
    display: flex;
    width: 430px;
    height: 64px;
    padding: 17px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-bottom: var(--sds-size-stroke-border) solid var(--Neutral-2, #dee5ed);
    opacity: var(--sds-size-stroke-border);
    background: #0d99ff;
    margin-bottom: 20px;
`;

const MyInfo = styled.span`
    margin-left: 10px;
    color: white;
    font-size: 18px;
`;

const HeaderComponent = () => {
    return (
        <Container>
            <Title>헤더</Title>
            <Header>
                <Image src={IconArrow.png} width={"31.85px"} height={"22.72px"} />
                <MyInfo>내 정보</MyInfo>
            </Header>
            <Header>
                <Image src={IconArrow} width={"31.85px"} height={"22.72px"} />
            </Header>
            <Header />
            <Header>
                <MyInfo>내 정보</MyInfo>
            </Header>
        </Container>
    );
};

export default HeaderComponent;
