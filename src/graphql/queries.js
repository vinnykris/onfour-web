export const query_name = `query listOnfour_registers {
    listOnfour_registers($filter: {
      email: {
        eq: TableArticleFilterInput
      }
      
    }
    $limit: Int
    $nextToken: String) {
      query_name(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        first
      }
      nextToken
    }
  }`;

export const query_name2 = `  query listOnfour_registers(
    $filter: TableOnfour_registerFilterInput
  ) {
    listOnfour_registers(filter: $filter) {
      items {
        first
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
