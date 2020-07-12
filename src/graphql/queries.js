// This file contains all queries that can be called to interact with
// our AppSync APIs

// Query to retrieve the first name of a logged in user based on their email from
// the registration DB table
export const query_name = `query listCreateOnfourRegistrations(
    $filter: TableCreateOnfourRegistrationFilterInput
  ) {
    listCreateOnfourRegistrations(filter: $filter, limit: 1000) {
      items {
        username
        first
        last
      }
    }
  }`;

export const list_users = `query listCreateOnfourRegistrations {
    listCreateOnfourRegistrations(limit: 1000, nextToken: null) {
      items {
        username
        first
        last
      }
      nextToken
    }
  }`;

// Query to retrieve all past shows
export const list_past_concerts = `query listPastShows {
    listPastShows(limit: 1000) {
      items {
        id
        artist_name
        concert_name
        concert_date
        video_url
        video_length
      }
    }
  }`;

// Query to retrieve all upcoming shows
export const list_upcoming_concerts = `query listFutureConcerts {
  listFutureConcerts(limit: 1000) {
    items {
      id
      url
      timePassed
      date
      time
      artist
      concertName
      description
      price
      concertId
      genre
      is_live
    }
  }
}`;


export const get_upcoming_concerts_with_id_old_table = `query getFutureConcerts(
    $id: ID!, $timePassed: Int!
  ) {
    getFutureConcerts(id: $id, timePassed: $timePassed) {
        is_live
    }
  }`;

export const get_upcoming_concerts_with_concert_id = `query getConcert(
    $concert_id: ID!
  ) {
    getConcert(concert_id: $concert_id) {
      date
      time
      is_live
    }
  }`;