import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container/Container";
import Typo from "../components/Typo/Typo";
import Header1 from "../components/Header/Header1";
import Flex from "../components/Flex/Flex";

const InfoContainer = styled.div`
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const InfoForm = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 14px;
  margin: 0 15px;
  flex: 1;
  text-align: left;
`;

const InputField = styled.input`
  height: 40px;
  flex: 1;
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
`;

const MoreMyInfo = () => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("newData");
    if (savedData) {
      setNewData(JSON.parse(savedData));
    }
  }, []);

  return (
    <Container>
      <Header1 />
      {newData.length > 0 ? (
        <Flex>
          {newData.map((data, index) => (
            <InfoContainer key={index}>
              <InfoForm>
                {data.address_name && (
                  <InputWrapper>
                    <Label htmlFor={`address_name_${index}`}>주소지 이름</Label>
                    <InputField
                      type="text"
                      id={`address_name_${index}`}
                      value={data.address_name}
                      readOnly
                    />
                  </InputWrapper>
                )}
                {data.road_address && (
                  <InputWrapper>
                    <Label htmlFor={`road_address_${index}`}>도로명 주소</Label>
                    <InputField
                      type="text"
                      id={`road_address_${index}`}
                      value={data.road_address}
                      readOnly
                    />
                  </InputWrapper>
                )}
                {data.detail_address && (
                  <InputWrapper>
                    <Label htmlFor={`detail_address_${index}`}>상세 주소</Label>
                    <InputField
                      type="text"
                      id={`detail_address_${index}`}
                      value={data.detail_address}
                      readOnly
                    />
                  </InputWrapper>
                )}
                {data.protector_name && (
                  <InputWrapper>
                    <Label htmlFor={`protector_name_${index}`}>보호자 이름</Label>
                    <InputField
                      type="text"
                      id={`protector_name_${index}`}
                      value={data.protector_name}
                      readOnly
                    />
                  </InputWrapper>
                )}
                {data.protector_email && (
                  <InputWrapper>
                    <Label htmlFor={`protector_email_${index}`}>보호자 이메일</Label>
                    <InputField
                      type="text"
                      id={`protector_email_${index}`}
                      value={data.protector_email}
                      readOnly
                    />
                  </InputWrapper>
                )}
              </InfoForm>
            </InfoContainer>
          ))}
        </Flex>
      ) : (
        <Container>
          <Typo text="추가된 정보가 없습니다." />
        </Container>
      )}
    </Container>
  );
};

export default MoreMyInfo;
