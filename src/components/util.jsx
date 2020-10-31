import React from "react";
import moment from "moment-timezone/builds/moment-timezone-with-data";
// Component Imports
import FeaturedContent from "../components/upcoming_show_page/featured_content";
import ArchiveVideo from "../components/archive_page/archive_video";

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
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

// Splits the input array into smaller chunks of equal size
export const createChunks = (array, chunk_size) => {
  let chunk_array = Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map((begin) => array.slice(begin, begin + chunk_size));

  if (!chunk_array.length) return [];

  let last_chunk_remainder =
    chunk_array[chunk_array.length - 1].length % chunk_size;

  // If last chunk has fewer than *chunk_size* elements, add empty elements to last chunk
  if (last_chunk_remainder) {
    let empty_array = Array(chunk_size - last_chunk_remainder).fill("");
    chunk_array.push(chunk_array.pop().concat(empty_array));
  }

  return chunk_array;
};

export const createUpcomingObject = (data, artist_data) => {
  const time_left = +new Date(data.date + "T24:00:00.000-04:00") - +new Date();
  const days_left = Math.floor(time_left / (1000 * 60 * 60 * 24));
  const formatted_time = moment
    .tz(data.date + "T" + data.time + ".000-04:00", moment.tz.guess())
    .format("h:mm A z");

  return {
    // id: data.id,
    img: data.poster_url,
    stub_url: data.stub_url,
    artist_name: artist_data.artist_name,
    concert_name: data.concert_name,
    week_day: moment(data.date).format("dddd"),
    date: data.date,
    formatted_date:
      data.date.slice(8, 10) +
      " " +
      month_map[data.date.slice(5, 7)] +
      " " +
      data.date.slice(0, 4),
    // moment(data.date).format('LL')
    time: data.time,
    formatted_time: formatted_time,
    month: month_map[data.date.slice(5, 7)],
    day: data.date.slice(8, 10),
    price: data.general_price,
    description: artist_data.artist_bio.toString(),
    days_left: days_left,
    genre: artist_data.genre,
    instagram: artist_data.instagram,
    facebook: artist_data.facebook,
    twitter: artist_data.twitter,
    spotify: artist_data.spotify,
    soundcloud: artist_data.soundcloud,
    merch: artist_data.soundcloud,
    location: data.location,
    suggested_price: data.suggested_price,
    minimum_price: data.minimum_price,
  };
};

export const formatUpcomingShow = (data, width) => {
  // Iterate through each element in the list and add the created
  // FeaturedContent to concerts
  const time_left = +new Date(data.date + "T24:00:00.000-04:00") - +new Date();
  const days_left = Math.floor(time_left / (1000 * 60 * 60 * 24));
  // console.log(data.date + "T" + data.time + ".000-04:00");
  // console.log(
  //   moment
  //     .tz(data.date + "T" + data.time + ".000-04:00", moment.tz.guess())
  //     .format("h:mm A z")
  // );
  const formatted_time = moment
    .tz(data.date + "T" + data.time + ".000-04:00", moment.tz.guess())
    .format("h:mm A z");
  return (
    <FeaturedContent
      id={data.id}
      img={data.poster_url}
      stub_url={data.stub_url}
      artist_name={data.artist_name}
      concert_name={data.concert_name}
      week_day={moment(data.date).format("dddd")}
      date={data.date}
      formatted_date={
        data.date.slice(8, 10) +
        " " +
        month_map[data.date.slice(5, 7)] +
        " " +
        data.date.slice(0, 4)
        // moment(data.date).format('LL')
      }
      time={data.time}
      formatted_time={formatted_time}
      month={month_map[data.date.slice(5, 7)]}
      day={data.date.slice(8, 10)}
      price={data.general_price}
      suggested_price={data.suggested_price}
      minimum_price={data.minimum_price}
      description={data.artist_bio.toString()}
      days_left={days_left}
      width={width}
      genre={data.genre}
      instagram={data.instagram}
      facebook={data.facebook}
      twitter={data.twitter}
      spotify={data.spotify}
      soundcloud={data.soundcloud}
      merch={data.merch}
      location={data.location}
      upcoming={true}
    />
  );
};

export const formatMemory = (data, width) => {
  // Iterate through each element in the list and add the created
  // FeaturedContent to concerts
  return (
    <FeaturedContent
      id={data.id}
      img={data.poster_url}
      stub_url={data.stub_url}
      artist_name={data.artist_name}
      concert_name={data.concert_name}
      week_day={moment(data.date).format("dddd")}
      date={data.date}
      formatted_date={
        data.date.slice(8, 10) +
        " " +
        month_map[data.date.slice(5, 7)] +
        " " +
        data.date.slice(0, 4)
        // moment(data.date).format('LL')
      }
      time={data.time}
      formatted_time={moment(data.time, "HH:mm:ss").format("h:mm A")}
      month={month_map[data.date.slice(5, 7)]}
      day={data.date.slice(8, 10)}
      price={data.general_price}
      description={data.artist_bio.toString()}
      width={width}
      genre={data.genre}
      instagram={data.instagram}
      facebook={data.facebook}
      twitter={data.twitter}
      spotify={data.spotify}
      soundcloud={data.soundcloud}
      merch={data.merch}
      location={data.location}
      upcoming={false}
    />
  );
};

export const formatArchiveVideos = (videos) => {
  var archive_videos = [];
  videos.forEach((data) => {
    archive_videos.push(
      <ArchiveVideo
        artist_name={data.artist_name}
        concert_name={data.concert_name}
        concert_date={data.concert_date}
        url={data.video_url}
        length={data.video_length}
      />
    );
  });
  return archive_videos;
};
