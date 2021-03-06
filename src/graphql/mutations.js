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
export const update_registration_concert = `mutation updateCreateOnfourRegistration($input: UpdateCreateOnfourRegistrationInput!) {
  updateCreateOnfourRegistration(input: $input) {
    username
    concert
  }
}
`;

// Mutation to update the is_live value for a concert in concert DB
export const update_concert_is_live = `mutation updateConcert($input: UpdateConcertInput!) {
  updateConcert(input: $input) {
    id
    is_live
  }
}
`;
export const update_user = `mutation updateCreateOnfourRegistration($input: UpdateCreateOnfourRegistrationInput!) {
  updateCreateOnfourRegistration(input: $input) {
    username
  }
}
`;

export const add_rsvp = `mutation updateConcert($input: UpdateConcertInput!) {
  updateConcert(input: $input) {
    id
    rsvp_list
  }
}`;

export const create_crew = `mutation createCrew($input: CreateCrewInput!) {
  createCrew(input: $input) {
    id 
    name 
    members 
    admin
  }
}
`;

export const update_crew = `mutation updateCrew($input: UpdateCrewInput!) {
  updateCrew(input: $input) {
    id
  }
}
`;

export const delete_crew = `mutation deleteCrew($input: DeleteCrewInput!) {
  deleteCrew(input: $input) {
    id
  }
}
`;
