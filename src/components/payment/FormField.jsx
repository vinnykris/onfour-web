import styled from "@emotion/styled";
import React from "react";

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 3%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 3%;
//   border-radius: 5px;
//   background-color: #30309663;

//   border-top: 1px solid #819efc;
//   &:first-of-type {
//     border-top: none;
//   }
`;

const Label = styled.label`
  width: 20%;
  min-width: 70px;
  padding: 11px 0;
  color: #303096;
//   color: white;
  font-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
//   border-right: 2px solid whitesmoke;
`;

const Input = styled.input`
  width: 100%;
  font-size: 100%;
  padding: 11px 15px 11px 8px;
  color: #303096;
  background-color: transparent;
  border-radius: 5px;
//   border: none;
  animation: 2ms void-animation-out;
  &::placeholder {
    color: #30309663;
  }
`;

const FormField = ({ label, type, name, placeholder, required }) => {
    return (
        <FormFieldContainer>
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type={type} placeholder={placeholder} required />
        </FormFieldContainer>
    );
};

export default FormField;