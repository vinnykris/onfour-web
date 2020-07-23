import React, { useState, useEffect } from "react";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "./AppSync";
import Auth from "./UserPool";

// Component Imports
import FeaturedContent from "../components/upcoming_show_page/featured_content";
import ArchiveVideo from "../components/archive_page/archive_video";

Amplify.configure(awsmobile);

const month_map = {
  "01": "JAN",
  "02": "FEB",
  "03": "MAR",
  "04": "APR",
  "05": "MAY",
  "06": "JUN",
  "07": "JUL",
  "08": "AUG",
  "09": "SEP",
  "10": "OCT",
  "11": "NOV",
  "12": "DEC",
};
const day_map = {
  Sat: "Sunday",
  Sun: "Monday",
  Mon: "Tuesday",
  Tue: "Wednesday",
  Wed: "Thursday",
  Thu: "Friday",
  Fri: "Saturday",
};

// getConcertInfo queries all elements in the future concert database
// and create a list of FeaturedContent objects with the data returned
// from the database.
export const getUpcomingShows = async (width, username) => {
  var upcoming_concerts = [];
  // Calling the API, using async and await is necessary
  const info = await API.graphql(
    graphqlOperation(queries.list_upcoming_concerts)
  );

  const info_list = info.data.listFutureConcerts.items; // Stores the items in database
  info_list.sort((a, b) => a.timePassed - b.timePassed);
  // console.log(info_list);

  // Iterate through each element in the list and add the created
  // FeaturedContent to concerts
  info_list.forEach((data) => {
    const day_in_week = new Date(data.date).toString();
    const hour = parseInt(data.time.slice(0, 2));
    const minutes = data.time.slice(2, 5);
    const time_left =
      +new Date(data.date + "T" + "24:00:00" + ".000-04:00") - +new Date();
    const days_left = Math.floor(time_left / (1000 * 60 * 60 * 24));

    upcoming_concerts.push(
      <FeaturedContent
        img={data.url}
        name={data.artist}
        concert_name={data.concertName}
        week_day={day_map[day_in_week.slice(0, 3)]}
        date={
          data.date.slice(8, 10) +
          " " +
          month_map[data.date.slice(5, 7)] +
          " " +
          data.date.slice(0, 4)
        }
        month={month_map[data.date.slice(5, 7)]}
        day={data.date.slice(8, 10)}
        time={
          hour > 12
            ? (hour - 12).toString() + minutes + "PM"
            : hour < 12
            ? data.time.slice(0, 5) + "AM"
            : data.time.slice(0, 5) + "PM"
        }
        price={data.price}
        description={data.description.toString()}
        days_left={days_left}
        width={width}
        genre={data.genre}
      />
    );
  });

  return upcoming_concerts;
};

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
        concert_name={data.concert_name}
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

export const getMostRecentUpcomingInfo = async () => {
  // Calling the API, using async and await is necessary
  const info = await API.graphql(
    graphqlOperation(queries.list_upcoming_concerts)
  );

  const info_list = info.data.listFutureConcerts.items; // Stores the items in database
  info_list.sort((a, b) => a.timePassed - b.timePassed);

  return info_list[0];
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
  return users_shows;
};

// this function returns the info necessary for displaying the upcoming
// RSVP'd shows on a user's profile
export const getUpcomingPurchasedShows = async (width, username) => {
  const user_concerts = await fetchUserConcerts();
  var upcoming_concerts = [];
  if (user_concerts !== []) {
    user_concerts.forEach((data) => {
      const data_object = data.data.getConcert;
      const day_in_week = new Date(data_object.date).toString();
      const hour = parseInt(data_object.time.slice(0, 2));
      const minutes = data_object.time.slice(2, 5);
      const time_left =
        +new Date(data_object.date + "T" + "24:00:00" + ".000-04:00") -
        +new Date();
      const days_left = Math.floor(time_left / (1000 * 60 * 60 * 24));

      upcoming_concerts.push(
        <FeaturedContent
          img={data_object.poster_url}
          name={"PLACHOLDER NAME"}
          concert_name={data_object.concert_name}
          week_day={day_map[day_in_week.slice(0, 3)]}
          date={
            data_object.date.slice(8, 10) +
            " " +
            month_map[data_object.date.slice(5, 7)] +
            " " +
            data_object.date.slice(0, 4)
          }
          month={month_map[data_object.date.slice(5, 7)]}
          day={data_object.date.slice(8, 10)}
          time={
            hour > 12
              ? (hour - 12).toString() + minutes + "PM"
              : hour < 12
              ? data_object.time.slice(0, 5) + "AM"
              : data_object.time.slice(0, 5) + "PM"
          }
          price={data_object.general_price}
          description="PLACEHOLDER DESCRIPTION"
          //days_left={days_left}
          width={width}
          genre={data_object.location || "PLACEHOLDER LOCATION"}
        />
      );
    });
  }
  return upcoming_concerts;
};
