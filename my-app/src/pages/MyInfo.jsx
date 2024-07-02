import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "../components/Image/Image";
import { ImageUser } from "../assets/image";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import authApi from "../apis/authApi";

const InfoForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 16px;
  margin: 0 10px;
  flex: 1;
  text-align: left;
`;

const InputField = styled.input`
  height: 40px;
  flex: 2;
  padding: 0 30px; // 필드 너비 약간 더 늘림
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  text-align: left;
`;

const SelectGenderButton = styled.div`
  flex: 2;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  // 액티브 상태면 파란색으로 색깔 변경
  background-color: ${({ active }) => (active ? "#0d99ff" : "#e6e6e6")};
  color: ${({ active }) => (active ? "white" : "black")};
  cursor: default;
  margin-left: 20px;
`;

const NumForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
`;

function MyInfo() {
  const [selectGender, setSelectGender] = useState(null);
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    name: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    // 사용자 정보 불러오기
    const fetchUserInfo = async () => {
      try {
        const response = await authApi.get("/me");
        setUserInfo(response.data);
        setSelectGender(response.data.gender);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Image
          src={ImageUser}
          width={"150px"}
          height={"150px"}
          style={{ marginBottom: "50px" }}
        />

        <InfoForm>
          <InputWrapper>
            <Label htmlFor="id">아이디</Label>
            <InputField type="text" id="id" value={userInfo.id} readOnly />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="pw">비밀번호</Label>
            <InputField
              type="password"
              id="pw"
              value={userInfo.password}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="name">이름</Label>
            <InputField type="text" id="name" value={userInfo.name} readOnly />
          </InputWrapper>
          <GenderContainer>
            <Label htmlFor="gender">성별</Label>
            <SelectGenderButton active={selectGender === "여성"}>
              여성
            </SelectGenderButton>
            <SelectGenderButton active={selectGender === "남성"}>
              남성
            </SelectGenderButton>
          </GenderContainer>
          <InputWrapper>
            <Label htmlFor="phone">연락처</Label>
            <InputField
              type="text"
              id="phone"
              value={userInfo.phone}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="age">나이</Label>
            <InputField type="text" id="age" value={userInfo.age} readOnly />
          </InputWrapper>
        </InfoForm>
        <NumForm>
          <PageNumber>1</PageNumber>
          <PageNumber>2</PageNumber>
        </NumForm>
      </Flex>
    </Container>
  );
}

export default MyInfo;
