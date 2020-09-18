import React, { useState, useEffect } from "react";
import moment from "moment";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "./AppSync";
import Auth from "./UserPool";

// Component Imports
import FeaturedContent from "../components/upcoming_show_page/featured_content";
import ProfileStub from "../components/user_profile/profile_stub";
import ArchiveVideo from "../components/archive_page/archive_video";

// API Imports
import { getArtistInfo } from "./get_concert_data";
import { formatUpcomingShow, formatMemory } from "../components/util";

Amplify.configure(awsmobile);

// Asynchronous function to get list of videos from database
export const getMemories = async (username) => {
  var archive_videos = [];
  // Calling the API, using async and await is necessary
  const info = await API.graphql(graphqlOperation(queries.list_past_concerts));
  const info_list = info.data.listPastShows.items; // Saves the items from database

  // Iterate through each element in the list and add the created ArchiveVideo to the list
  info_list.forEach((data) => {
    archive_videos.push(
      <ArchiveVideo
        artist_name={data.artist_name}
        // concert_name={data.concert_name}
        concert_date={data.concert_date}
        url={data.video_url}
        length={data.video_length}
      />
    );
    // setVideos((videos) => [
    //   ...videos,
    //   <ArchiveVideo
    //     artist_name={data.artist_name}
    //     concert_name={data.concert_name}
    //     concert_date={data.concert_date}
    //     url={data.video_url}
    //     length={data.video_length}
    //   />,
    // ]);
  });

  return archive_videos;
};

export const getTickets = async (username) => {
  if (username) {
    const user_data = await API.graphql(
      graphqlOperation(queries.get_user_concert, {
        input: username,
      })
    );
    const concert_data = user_data.data.getCreateOnfourRegistration.concert;
    if (concert_data && isNaN(parseInt(concert_data))) {
      const parsed_concerts = JSON.parse(concert_data);
      const concerts_ids = Object.keys(parsed_concerts);
      return concerts_ids;
    }
  }
};

// Function fetches an authenticated user's concerts JSON. It then
// parses it and retrieves the concert_ids for each concert. It then
// fetches the concert data associated with each id and returns a list
// of that data
export const fetchUserConcertIDs = async (username) => {
  // const authenticated_user = await Auth.currentAuthenticatedUser();
  if (username) {
    // console.log(username);
    const user_data = await API.graphql(
      graphqlOperation(queries.get_user_data, {
        input: username,
      })
    );
    // console.log(user_data);
    const concert_data = user_data.data.getCreateOnfourRegistration.concert;
    if (concert_data && isNaN(parseInt(concert_data))) {
      const parsed_concerts = JSON.parse(concert_data);
      const concerts_ids = Object.keys(parsed_concerts);
      return concerts_ids;
    }
  }
};

// Function fetches an authenticated user's concerts JSON. It then
// parses it and retrieves the concert_ids for each concert. It then
// fetches the concert data associated with each id and returns a list
// of that data
export const fetchUserConcerts = async () => {
  var users_shows = [];
  const authenticated_user = await Auth.currentAuthenticatedUser();
  if (authenticated_user) {
    const user_data = await API.graphql(
      graphqlOperation(queries.get_user_data, {
        input: authenticated_user.username,
      })
    );
    const concert_data = user_data.data.getCreateOnfourRegistration.concert;
    if (concert_data && isNaN(parseInt(concert_data))) {
      const parsed_concerts = JSON.parse(concert_data);
      const concerts_ids = Object.keys(parsed_concerts);

      for (let i = 0; i < concerts_ids.length; i++) {
        const concert_info = await API.graphql(
          graphqlOperation(queries.get_one_concert, {
            id: concerts_ids[i],
          })
        );
        users_shows.push(concert_info);
      }
    }
  }
  // console.log(users_shows);
  return users_shows;
};

// this function returns the info necessary for displaying the upcoming
// RSVP'd shows on a user's profile
export const getUpcomingPurchasedShows = async (width, username) => {
  const user_concerts = await fetchUserConcerts();
  user_concerts.sort((a, b) =>
    moment(a.data.getConcert.date + "T" + a.data.getConcert.time).diff(
      moment(b.data.getConcert.date + "T" + b.data.getConcert.time)
    )
  );
  var upcoming_concerts = [];
  // The past_concerts is not returned for this function
  // but later, both upcoming_concerts and past_concerts
  // can be returned by this one function
  var past_concerts = [];
  var all_ticketstubs = [];

  const getUpcomingFull = async (data) => {
    const artist_id = data.artist_id;
    const artist_info = await getArtistInfo(artist_id);
    let merged = { ...data, ...artist_info };
    return merged;
  };

  if (user_concerts !== []) {
    for await (const data of user_concerts) {
      if (data.data.getConcert.is_future) {
        upcoming_concerts.push(
          formatUpcomingShow(await getUpcomingFull(data.data.getConcert))
        );
        all_ticketstubs.push(
          <ProfileStub
            img={await data.data.getConcert.stub_url}
            className="profile-stub-component"
          />
        );
      } else {
        past_concerts.push(
          formatMemory(await getUpcomingFull(data.data.getConcert))
        );
        all_ticketstubs.push(
          <ProfileStub
            img={await data.data.getConcert.stub_url}
            className="profile-stub-component"
          />
        );
      }
    }
  }
  return [upcoming_concerts, past_concerts, all_ticketstubs];
};
