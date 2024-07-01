import React from "react";
import styled from "styled-components";

// 레이블 + 입력 필드
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// 레이블
const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  text-align: left;
  margin: 0 10px;
`;

// 입력 필드
const InputField = styled.input`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// 셀렉트 필드
const SelectField = styled.select`
  height: 40px;
  width: 195px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Input = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  options = [],
}) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      {type === "select" ? (
        // 셀렉트 그룹
        <SelectField name={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      ) : (
        // 일반 텍스트 입력
        <InputField
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </InputWrapper>
  );
};

export default Input;
