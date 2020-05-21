export const createOnfour_current = `mutation createOnfour_current($input: CreateOnfour_currentInput!) {
  createOnfour_current(input: $input) {
    email
    paid
  }
}
`;

export const createOnfour_registration = `mutation createRegister($input: CreateRegisterInput!) {
  createRegister(input: $input) {
    email
    paid
  }
}
`;
