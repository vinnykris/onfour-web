export const createOnfour_current = `mutation createOnfour_current($input: CreateOnfour_currentInput!) {
  createOnfour_current(input: $input) {
    email
    paid
  }
}
`;

export const createOnfour_reg = `mutation createOnfour_register($input: CreateOnfour_registerInput!) {
createOnfour_register(input: $input) {
    email
    first
    last
    paid
  }
}
`;
