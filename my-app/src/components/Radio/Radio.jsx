import React from "react";
import styled from "styled-components";

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin: 10px;
  text-align: left;
  flex: 1;
`;

const RadioButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0 20px;
  flex: 1;
`;

const RadioButton = styled.input`
  display: inline-block;
`;

const Radio = ({ label, name, options, value, onChange }) => {
  return (
    <RadioWrapper>
      {label && <Label>{label}</Label>}
      <RadioButtonGroup>
        {options.map((option, index) => (
          <label key={index}>
            <RadioButton
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) =>
                onChange({ target: { name, value: e.target.value } })
              }
            />
            {option.label}
          </label>
        ))}
      </RadioButtonGroup>
    </RadioWrapper>
  );
};

export default Radio;
