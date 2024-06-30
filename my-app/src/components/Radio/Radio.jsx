import React from "react";
import styled from "styled-components";

// 전체 컨테이너
const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;

// 레이블
const Label = styled.label`
  font-size: 16px;
  margin: 10px;
  text-align: left;
  flex: 1;
`;

// 라디오 버튼 Wrapper
const RadioButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0 20px;
  flex: 1;
`;

// 라디오 버튼
const RadioButton = styled.input`
  display: inline-block;
`;

const Radio = ({ label, options, value, onChange }) => {
  return (
    <RadioWrapper>
      {label && <Label>{label}</Label>}
      <RadioButtonGroup>
        {options.map((option, index) => (
          <label key={index}>
            <RadioButton
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </RadioButtonGroup>
    </RadioWrapper>
  );
};

export default Radio;
