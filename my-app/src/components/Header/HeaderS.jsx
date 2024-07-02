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
  position: fixed;
  top: 0;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderComponentS = () => {
  const navigate = useNavigate();

  const goToBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Header>
        <ImageContainer>
          <Image
            src={IconArrow}
            width={"31.85px"}
            height={"22.72px"}
            onClick={goToBackPage}
          />
        </ImageContainer>
      </Header>
    </>
  );
};

export default HeaderComponentS;
