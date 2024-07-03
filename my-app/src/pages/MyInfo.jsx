import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "../components/Image/Image";
import { ImageUser } from "../assets/image";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import authApi from "../apis/authApi";
import AddButton from "../components/Button/AddButton";
import Button from "../components/Button/Button";

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

const NumForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;

  color: ${({ active }) =>
    active ? "#0d99ff" : "black"}; /* 선택한 페이지만 파란색으로 액티브 */
`;

function MyInfo() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    name: "",
    phone: "",
    age: "",
    // 2페이지 정보 추가
    protector_name: "",
    protector_phone: "",
    address_name: "",
    road_address: "",
    detail_address: "",
  });

  // Pagenation 동적 관리
  const [currentPage, setCurrentPage] = useState(1); // 기본으로 1페이지 보여줌
  const [pages, setPages] = useState([1, 2]); // 기본 정보는 1, 2페이지로 초기화
  const [newPageData, setNewPageData] = useState({}); // 새 페이지 만들기

  useEffect(() => {
    // 사용자 정보 불러오기
    const fetchUserInfo = async () => {
      try {
        const response = await authApi.get("/me");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션 처리
  const handleAddPage = () => {
    const newPageNumber = pages.length + 1;
    setPages([...pages, newPageNumber]);
    setCurrentPage(newPageNumber);
  };

  const handleInputChange = (e, pageNumber) => {
    const { name, value } = e.target;
    setNewPageData({
      ...newPageData,
      [pageNumber]: {
        ...newPageData[pageNumber],
        [name]: value,
      },
    });
  };

  const handleSubmit = async (pageNumber) => {
    const pageData = newPageData[pageNumber];
    try {
      const response = await authApi.post("/add_info", pageData);
      if (response.data.status === "success") {
        alert("정보가 성공적으로 등록되었습니다.");
      } else {
        alert("정보 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to submit new info", error);
      alert("정보 등록에 실패했습니다.");
    }
  };

  const renderPageContent = (pageNumber) => {
    if (pageNumber <= 2) {
      // 페이지 1
      switch (pageNumber) {
        case 1:
          return (
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
                <InputField
                  type="text"
                  id="name"
                  value={userInfo.name}
                  readOnly
                />
              </InputWrapper>
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
                <InputField
                  type="text"
                  id="age"
                  value={userInfo.age}
                  readOnly
                />
              </InputWrapper>
            </InfoForm>
          );

        // 페이지 2
        case 2:
          return (
            <InfoForm>
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
                <Label htmlFor="protector_phone">보호자 연락처</Label>
                <InputField
                  type="text"
                  id="protector_phone"
                  value={userInfo.protector_phone}
                  readOnly
                />
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor="address_name">주소지 이름</Label>
                <InputField
                  type="text"
                  id="address_name"
                  value={userInfo.address_name}
                  readOnly
                />
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor="road_address">도로명 주소</Label>
                <InputField
                  type="text"
                  id="road_address"
                  value={userInfo.road_address}
                  readOnly
                />
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor="detail_address">상세 주소</Label>
                <InputField
                  type="text"
                  id="detail_address"
                  value={userInfo.detail_address}
                  readOnly
                />
              </InputWrapper>
            </InfoForm>
          );
        default:
          return null;
      }
    }
    // 새로운 페이지 생성
    else {
      const pageData = newPageData[pageNumber] || {};
      return (
        <InfoForm>
          <InputWrapper>
            <Label htmlFor={`protector_name_${pageNumber}`}>보호자 이름</Label>
            <InputField
              type="text"
              id={`protector_name_${pageNumber}`}
              name="protector_name"
              value={pageData.protector_name || ""}
              onChange={(e) => handleInputChange(e, pageNumber)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={`protector_phone_${pageNumber}`}>
              보호자 연락처
            </Label>
            <InputField
              type="text"
              id={`protector_phone_${pageNumber}`}
              name="protector_phone"
              value={pageData.protector_phone || ""}
              onChange={(e) => handleInputChange(e, pageNumber)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={`address_name_${pageNumber}`}>주소지 이름</Label>
            <InputField
              type="text"
              id={`address_name_${pageNumber}`}
              name="address_name"
              value={pageData.address_name || ""}
              onChange={(e) => handleInputChange(e, pageNumber)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={`road_address_${pageNumber}`}>도로명 주소</Label>
            <InputField
              type="text"
              id={`road_address_${pageNumber}`}
              name="road_address"
              value={pageData.road_address || ""}
              onChange={(e) => handleInputChange(e, pageNumber)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={`detail_address_${pageNumber}`}>상세 주소</Label>
            <InputField
              type="text"
              id={`detail_address_${pageNumber}`}
              name="detail_address"
              value={pageData.detail_address || ""}
              onChange={(e) => handleInputChange(e, pageNumber)}
            />
          </InputWrapper>
          {/* 확인 누르면 새 페이지 생성되어야 함 */}
          <Button text="등록 확인" onClick={() => handleSubmit(pageNumber)} />
        </InfoForm>
      );
    }
  };

  return (
    <Container>
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
          <AddButton onClick={handleAddPage} />
        </NumForm>
      </Flex>
    </Container>
  );
}

export default MyInfo;
