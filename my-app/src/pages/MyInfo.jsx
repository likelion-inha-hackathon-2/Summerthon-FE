import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Image from "../components/Image/Image";
import { ImageUser } from "../assets/image";

const InfoContainer = styled.div`
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

const InfoForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
  max-width: 250px;
  label {
    font-size: 14px;
    margin-bottom: 5px;
  }
  input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #e6e6e6;
  }
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 252px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SelectButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e6e6e6;
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    background-color: #e0e0e0;
  }
  &.active {
    background-color: #0d99ff;
    color: white;
  }
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
  const [selectgender, setSelectGender] = useState(null);
  const ClickedMan = () => {
    setSelectGender("남성");
  };
  const ClickedWoman = () => {
    setSelectGender("여성");
  };
  return (
    <InfoContainer>
      <Image src={ImageUser} width={"120px"} height={"120px"} />
      <InfoForm>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" />
      </InfoForm>
      <InfoForm>
        <label htmlFor="pw">비밀번호</label>
        <input type="password" id="pw" />
      </InfoForm>
      <InfoForm>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" />
      </InfoForm>
      <GenderContainer>
        <SelectButton
          className={selectgender === "남성" ? "active" : " "}
          onClick={ClickedMan}
        >
          남성
        </SelectButton>
        <SelectButton
          className={selectgender === "여성" ? "active" : " "}
          onClick={ClickedWoman}
        >
          여성
        </SelectButton>
      </GenderContainer>
      <InfoForm>
        <label htmlFor="phone">연락처</label>
        <input type="text" id="phone" />
      </InfoForm>
      <InfoForm>
        <label htmlFor="job">직업</label>
        <input type="text" id="job" />
      </InfoForm>
      <InfoForm>
        <label htmlFor="age">나이</label>
        <input type="text" id="age" />
      </InfoForm>
      <NumForm>
        <PageNumber>1</PageNumber>
        <PageNumber>2</PageNumber>
      </NumForm>
    </InfoContainer>
  );
}

export default MyInfo;
