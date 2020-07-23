import moment from "moment";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "./AppSync";

Amplify.configure(awsmobile);

export const getConcertInfo = async () => {
  // Calling the API, using async and await is necessary
  const info = await API.graphql(
    graphqlOperation(queries.list_concerts, {
      filter: { is_future: { eq: true }, is_confirmed: { eq: true } },
    })
  );

  const info_list = info.data.listConcerts.items; // Stores the items in database
  info_list.sort((a, b) =>
    moment(a.date + "T" + a.time).diff(moment(b.date + "T" + b.time))
  );

  return info_list;
};

// Asynchronous function to get list of videos from database
export const getArchiveInfo = async () => {
  // Calling the API, using async and await is necessary
  const info = await API.graphql(graphqlOperation(queries.list_past_concerts));
  const info_list = info.data.listPastShows.items; // Saves the items from database

  info_list.sort((a, b) => new Date(b.concert_date) - new Date(a.concert_date));

  return info_list;
};

export const getMostRecentUpcomingInfo = async () => {
  // Calling the API, using async and await is necessary
  const info = await API.graphql(
    graphqlOperation(queries.list_concerts, {
      filter: { is_future: { eq: true }, is_confirmed: { eq: true } },
    })
  );

  const info_list = info.data.listConcerts.items; // Stores the items in database
  info_list.sort((a, b) =>
    moment(a.date + "T" + a.time).diff(moment(b.date + "T" + b.time))
  );

  return info_list[0];
};

export const getOneConcert = async (id) => {
  // Calling the API, using async and await is necessary

  const info = await API.graphql(
    graphqlOperation(queries.get_one_concert, { id: id })
  );
  const item = info.data.getConcert;
  return item;
};

export const getArtistInfo = async (artist_id) => {
  const artist_info = await API.graphql(
    graphqlOperation(queries.get_artist_info, {
      username: artist_id,
    })
  );
  const artist_info_list = artist_info.data.getCreateOnfourRegistration;
  return artist_info_list;
};
