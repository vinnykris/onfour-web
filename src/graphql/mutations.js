// This file contains all mutations that can be called to interact with
// our AppSync APIs

// Mutation to create an entry in our email subscription list DB when an email is entered
// in a subscription box on our website. Currently takes email and paid inputs,
// though paid is curently an arbitrary false value
export const createEmailSubscription = `mutation createOnfour_current($input: CreateOnfour_currentInput!) {
    createOnfour_current(input: $input) {
      email
      paid
    }
  }
}
`;

export const createOnfour_reg = `mutation createOnfour_register2($input: CreateOnfour_register2Input!) {
createOnfour_register2(input: $input) {
    email
    first
    last
    paid
  }
}
`;
