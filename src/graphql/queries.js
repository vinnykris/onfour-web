// This file contains all queries that can be called to interact with
// our AppSync APIs

// Query to retrieve the first name of a logged in user based on their email from
// the registration DB table
export const retrieveName = `query listOnfour_registers(
    $filter: TableOnfour_registerFilterInput
  ) {
    listOnfour_registers(filter: $filter) {
      items {
        first
      }
    }
  }`;

export const retrieveConcert = `query listOnfour_registrations(
    $filter: TableOnfour_registrationFilterInput
  ) {
    listOnfour_registrations(filter: $filter) {
      items {
        concert
      }
    }
  }`;
