export const createOnfour_current = `mutation createOnfour_current($input: CreateOnfour_currentInput!) {
  createOnfour_current(input: $input) {
    email
    paid
  }
}
`;

export const createOnfour_reg = `mutation createOnfour_register2($input: CreateOnfour_registerInput2!) {
createOnfour_register2(input: $input) {
    email
    first
    last
    paid
  }
}
`;
