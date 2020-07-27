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
export const list_upcoming_concerts = `query listConcerts(
  $filter: TableConcertFilterInput
) {
listConcerts(filter: $filter, limit: 1000) {
  items {
    id
    artist_id
    date
    time
    poster_url
    concert_name
    general_price
    is_live
  }
}
}`;

export const get_artist_info = `query getCreateOnfourRegistration(
  $username: String!
) {
  getCreateOnfourRegistration(username: $username) {
      artist_name
      artist_bio
      genre
      instagram
      spotify
      twitter
      facebook
      soundcloud
  }
}`;

export const get_concert_is_live = `query getConcert(
  $id: ID!
) {
  getConcert(id: $id) {
      is_live
  }
}`;

export const get_concert_date_time_is_live = `query getConcert(
  $id: ID!
) {
  getConcert(id: $id) {
    date
    time
    is_live
  }
}`;

// Query to retrieve all upcoming shows
export const get_specific_concert = `query listFutureConcerts(
$filter: TableFutureConcertsFilterInput
) {
listFutureConcerts(filter: $filter, limit: 1000) {
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
  }
}
}`;

export const get_user_data = `query getCreateOnfourRegistration ($input: String!){
getCreateOnfourRegistration(username: $input) {
  username
  first
  concert
}
}`;

// Query to retrieve all upcoming shows
export const list_concerts = `query listConcerts(
$filter: TableConcertFilterInput
) {
listConcerts(filter: $filter, limit: 1000) {
  items {
    id
    poster_url
    stub_url
    location
    date
    time
    is_live
    artist_id
    concert_name
    general_price
  }
}
}`;

export const get_one_concert = `query getConcert(
$id: ID!
) {
getConcert(id: $id) {
  id
  poster_url
  stub_url
  location
  date
  time
  is_live
  is_future
  artist_id
  concert_name
  general_price
}
}`;
