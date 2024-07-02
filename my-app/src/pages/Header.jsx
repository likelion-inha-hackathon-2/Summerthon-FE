import React from "react";
import styled from "styled-components";
import Image from "../components/Image/Image";
import IconArrow from "../assets/icons/arrow.png";

const Header = styled.div`
    display: flex;

    width: 380px;
    height: 30px;
    padding: 17px 24px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-bottom: var(--sds-size-stroke-border) solid var(--Neutral-2, #dee5ed);
    background: #0d99ff;
    border-bottom: 1px solid #dee5ed;
    margin-bottom: 93px;
    top: 0;
    position: fixed;
`;

const MyInfo = styled.span`
    color: #fff;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 36px */
    letter-spacing: -0.456px;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderComponent = () => {
    return (
        <>
            <Header>
                <ImageContainer>
                    <Image src={IconArrow} width={"31.85px"} height={"22.72px"} />
                </ImageContainer>
                <TextContainer>
                    <MyInfo>내 정보</MyInfo>
                </TextContainer>
            </Header>
        </>
    );
};

export default HeaderComponent;
