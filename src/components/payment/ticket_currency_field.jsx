// React Imports
import React from "react";

// Styles Imports
import styled from "@emotion/styled";
import NumberFormat from "react-number-format";


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

// Export CurrencyField component, which is part of the payment form that let users to input the amount of money to pay through Stripe.
// When users type in number, the $ sign will show up and only number in at most two decimal places is allowed
const CurrencyField = ({label, name, value}) => {
    return (
        <FormFieldContainer>
            <Label htmlFor={name}>{label}</Label>
            <Label>{"$"+value}</Label>
        </FormFieldContainer>
    );
};

export default CurrencyField;