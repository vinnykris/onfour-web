// This file contains all mutations that can be called to interact with
// our AppSync APIs

// Mutation to create an entry in our email subscription list DB when an email is entered
// in a subscription box on our website. Currently takes email and paid inputs,
// though paid is curently an arbitrary false value
export const create_email_subscription = `mutation createOnfour_current($input: CreateOnfour_currentInput!) {
    createOnfour_current(input: $input) {
      email
      paid
    }
  }
`;

// Mutation to create an entry in our registration DB when a user registers
// Currently, it takes email, first, last, and concert as inputs, though concert
// is initially empty
export const create_registration = `mutation createCreateOnfourRegistration($input: CreateCreateOnfourRegistrationInput!) {
  createCreateOnfourRegistration(input: $input) {
    username
    email
    first
    last
    concert
  }
}
`;

// Mutation to create an entry in our upcoming shows DB when a musician registers a concert
export const create_upcoming = `mutation createFutureConcerts($input: CreateFutureConcertsInput!) {
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

// Mutation to update the concert variable in registartion DB based on user_email
export const update_registration_concert = `mutation updateOnfour_registration($input: UpdateOnfour_registrationInput!) {
  updateOnfour_registration(input: $input) {
    id
    concert
  }
}
`;
