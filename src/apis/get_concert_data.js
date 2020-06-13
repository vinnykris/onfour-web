import React, { useState, useEffect } from "react";

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
export const getConcertInfo = async (width) => {
  
  var upcoming_concerts = [];
  // Calling the API, using async and await is necessary
  const info = await API.graphql(
    graphqlOperation(queries.list_upcoming_concerts)
  );

  const info_list = info.data.listFutureConcerts.items; // Stores the items in database
  info_list.sort((a, b) => a.timePassed - b.timePassed);
  // console.log(info_list);
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

  // Iterate through each element in the list and add the created
  // FeaturedContent to concerts
  info_list.forEach((data) => {
    const day_in_week = new Date(data.date).toString();
    const hour = parseInt(data.time.slice(0, 2));
    const minutes = data.time.slice(2, 5);
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
        width={width}
        genre={data.genre}
      />
    );
  });

  return upcoming_concerts;
};

// Asynchronous function to get list of videos from database
export const getArchiveInfo = async () => {
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