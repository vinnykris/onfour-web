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

// Mutation to create an entry in our registration DB when a user registers
// Currently, it takes email, first, last, and concert as inputs, though concert
// is initially empty
export const createRegistration = `mutation createOnfour_registration($input: CreateOnfour_registrationInput!) {
  createOnfour_registration(input: $input) {
    email
    first
    last
    concert
  }
}
`;

// Mutation to create an entry in our upcoming shows DB when a musician registers a concert
export const createUpcoming = `mutation createFutureConcerts($input: CreateFutureConcertsInput!) {
  createFutureConcerts(input: $input) {
    url
    timePassed
    date
    time
    artist
    concertName
    description
    price
    concertId
  }
}
`;
