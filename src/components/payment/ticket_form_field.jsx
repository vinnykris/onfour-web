// React Imports
import React from "react";

// Styles Imports
import styled from "@emotion/styled";

// Style defination for the form field container
const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 3%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 3%;
`;

// Style defination for the label of each form field
const Label = styled.label`
  width: 20%;
  min-width: 70px;
  padding: 11px 0;
  color: #794D94;
  font-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Style defination for the input text of each form field
const Input = styled.input`
  width: 100%;
  font-size: 100%;
  padding: 11px 15px 11px 8px;
  color: #794D94;
  background-color: #794d9427;
  border: none;
  border-radius: 3px;
  animation: 2ms void-animation-out;
  &::placeholder {
    color: #794d9481;
  }
  &:focus {
        border: 2px solid #794D94;
  }
`;

// Export FormField component, which is part of the payment form that takes in user's information such as name, email, etc.
const FormField = ({ label, type, name, placeholder, value, onChange, required }) => {
    return (
        <FormFieldContainer>
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} />
        </FormFieldContainer>
    );
};

export default FormField;