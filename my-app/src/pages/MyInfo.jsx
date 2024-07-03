import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "../components/Image/Image";
import { ImageUser } from "../assets/image";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import authApi from "../apis/authApi";
import AddButton from "../components/Button/AddButton";
import Header2 from "../components/Header/Header2";
import AddInfoModal from "../components/AddInfoModal/AddInfoModal";
import useForm from "../hooks/useForm";

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
  padding: 0 30px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007bff;
    outline: none;
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
  color: ${({ active }) => (active ? "#0d99ff" : "black")};
`;

function MyInfo() {
  const [userInfo, setUserInfo] = useState({
    user_login_id: "",
    password: "",
    user_name: "",
    user_gender: "",
    user_phone: "",
    user_age: "1",
    protector_name: "",
    protector_email: "",
    represent_address: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [newPageData, setNewPageData] = useState({
    protector: [],
    address: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { values, handleChange, setValue } = useForm({
    protector_name: "",
    protector_email: "",
    address_name: "",
    road_address: "",
    detail_address: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await authApi.get("/me");
        const data = response.data;
        setUserInfo({
          user_login_id: data.user.user_login_id,
          password: data.user.password,
          user_name: data.user.user_name,
          user_gender: data.user.user_gender,
          user_phone: data.user.user_phone,
          user_age: data.user.user_age,
          protector_name: data.represent_protector.protector_name,
          protector_email: data.represent_protector.protector_email,
          represent_address: data.represent_address,
        });
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddPage = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const pageData =
      modalType === "protector"
        ? {
            protector_name: values.protector_name,
            protector_email: values.protector_email,
          }
        : {
            address_name: values.address_name,
            road_address: values.road_address,
            detail_address: values.detail_address,
          };

    try {
      const endpoint =
        modalType === "protector" ? "/new/protectors" : "/new/addresses";
      const response = await authApi.post(endpoint, pageData);
      if (response.status === 201) {
        alert("정보가 성공적으로 등록되었습니다.");
        setIsModalOpen(false);
        setErrorMessage("");
        setNewPageData((prevData) => ({
          ...prevData,
          [modalType]: [...prevData[modalType], pageData],
        }));
        const newPageNumber = pages.length + 1;
        setPages([...pages, newPageNumber]);
        setCurrentPage(newPageNumber);
        setValue("protector_name", "");
        setValue("protector_email", "");
        setValue("address_name", "");
        setValue("road_address", "");
        setValue("detail_address", "");
      }
    } catch (error) {
      console.error("Failed to submit new info", error);
      setErrorMessage("정보 등록에 실패했습니다.");
    }
  };

  const renderPageContent = (pageNumber) => {
    if (pageNumber === 1) {
      return (
        <InfoForm>
          <InputWrapper>
            <Label htmlFor="user_name">이름</Label>
            <InputField
              type="text"
              id="user_name"
              value={userInfo.user_name}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="user_age">나이</Label>
            <InputField
              type="text"
              id="user_age"
              value={userInfo.user_age}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="user_gender">성별</Label>
            <InputField
              type="text"
              id="user_gender"
              value={userInfo.user_gender}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="protector_name">보호자 이름</Label>
            <InputField
              type="text"
              id="protector_name"
              value={userInfo.protector_name}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="protector_email">보호자 이메일</Label>
            <InputField
              type="text"
              id="protector_email"
              value={userInfo.protector_email}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="represent_address">주소지</Label>
            <InputField
              type="text"
              id="represent_address"
              value={userInfo.represent_address}
              readOnly
            />
          </InputWrapper>
        </InfoForm>
      );
    } else if (pageNumber === 2) {
      return newPageData.protector.map((protector, index) => (
        <InfoForm key={index}>
          <InputWrapper>
            <Label htmlFor={`protector_name_${index}`}>보호자 이름</Label>
            <InputField
              type="text"
              id={`protector_name_${index}`}
              value={protector.protector_name}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={`protector_email_${index}`}>보호자 이메일</Label>
            <InputField
              type="text"
              id={`protector_email_${index}`}
              value={protector.protector_email}
              readOnly
            />
          </InputWrapper>
        </InfoForm>
      ));
    } else if (pageNumber === 3) {
      return newPageData.address.map((address, index) => (
        <InfoForm key={index}>
          <InputWrapper>
            <Label htmlFor={`address_name_${index}`}>주소지 이름</Label>
            <InputField
              type="text"
              id={`address_name_${index}`}
              value={address.address_name}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={`road_address_${index}`}>도로명 주소</Label>
            <InputField
              type="text"
              id={`road_address_${index}`}
              value={address.road_address}
              readOnly
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={`detail_address_${index}`}>상세 주소</Label>
            <InputField
              type="text"
              id={`detail_address_${index}`}
              value={address.detail_address}
              readOnly
            />
          </InputWrapper>
        </InfoForm>
      ));
    }
  };

  return (
    <Container>
      <Header2 />
      <Flex direction="column" align="center" justify="center">
        <Image
          src={ImageUser}
          width={"150px"}
          height={"150px"}
          style={{ marginBottom: "50px" }}
        />
        {renderPageContent(currentPage)}
        <NumForm>
          {pages.map((page) => (
            <PageNumber
              key={page}
              active={currentPage === page}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PageNumber>
          ))}
        </NumForm>
        <Flex direction="row">
          <AddButton
            text="보호자 추가"
            onClick={() => handleAddPage("protector")}
          />
          <AddButton
            text="주소지 추가"
            onClick={() => handleAddPage("address")}
          />
        </Flex>
      </Flex>
      <AddInfoModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        modalType={modalType}
        newPageData={values}
        handleInputChange={handleChange}
        errorMessage={errorMessage}
      />
    </Container>
  );
}

export default MyInfo;
