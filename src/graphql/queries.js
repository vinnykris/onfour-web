// This file contains all queries that can be called to interact with
// our AppSync APIs

// Query to retrieve the first name of a logged in user based on their email from
// the registration DB table
export const query_name = `query listOnfour_registrations(
    $filter: TableOnfour_registrationFilterInput
  ) {
    listOnfour_registrations(filter: $filter) {
      items {
        first
      }
    }
  }`;

// Query to retrieve all upcoming shows
export const list_upcoming_concerts = `query listFutureConcerts {
    listFutureConcerts {
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
      }
    }
  }`;

// Query to retrieve all past shows
export const list_past_concerts = `query listPastShows {
    listPastShows {
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

export const list_upcoming_concerts = `query listFutureConcerts {
    listFutureConcerts {
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
      }
    }
  }`;