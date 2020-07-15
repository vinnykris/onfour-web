import React, { useState, useEffect } from "react";
import moment from "moment";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "./AppSync";

// Component Imports
import FeaturedContent from "../components/upcoming_show_page/featured_content";
import ArchiveVideo from "../components/archive_page/archive_video";

Amplify.configure(awsmobile);

// getConcertInfo queries all elements in the future concert database
// and create a list of FeaturedContent objects with the data returned
// from the database.
export const getConcertInfo = async () => {
  // Calling the API, using async and await is necessary
  const info = await API.graphql(
    graphqlOperation(queries.list_upcoming_concerts, {
      filter: { is_future: { eq: true }, is_confirmed: { eq: true } },
    })
  );

  const info_list = info.data.listFutureConcerts.items; // Stores the items in database
  info_list.sort((a, b) =>
    moment(a.date + "T" + a.time).diff(moment(b.date + "T" + b.time))
  );

  return info_list;
};

export const getConcertInfoNew = async () => {
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
  var archive_videos = [];
  // Calling the API, using async and await is necessary
  const info = await API.graphql(graphqlOperation(queries.list_past_concerts));
  const info_list = info.data.listPastShows.items; // Saves the items from database

  // Iterate through each element in the list and add the created ArchiveVideo to the list
  // info_list.forEach((data) => {
  //   archive_videos.push(
  //     <ArchiveVideo
  //       artist_name={data.artist_name}
  //       concert_name={data.concert_name}
  //       concert_date={data.concert_date}
  //       url={data.video_url}
  //       length={data.video_length}
  //     />
  //   );
  //   // setVideos((videos) => [
  //   //   ...videos,
  //   //   <ArchiveVideo
  //   //     artist_name={data.artist_name}
  //   //     concert_name={data.concert_name}
  //   //     concert_date={data.concert_date}
  //   //     url={data.video_url}
  //   //     length={data.video_length}
  //   //   />,
  //   // ]);
  // });

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

  // console.log;

  const info_list = info.data.listConcerts.items; // Stores the items in database
  info_list.sort((a, b) =>
    moment(a.date + "T" + a.time).diff(moment(b.date + "T" + b.time))
  );

  return info_list[0];
};

export const getOneConcert = async (id) => {
  // Calling the API, using async and await is necessary
  // const info = await API.graphql(
  //   graphqlOperation(queries.get_specific_concert, {
  //     filter: { id: { eq: id } },
  //   })
  // );

  const info = await API.graphql(
    graphqlOperation(queries.get_one_concert, {
      id: id,
      // { id: { eq: id } },
    })
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
