// React imports
import React, { useState, useEffect } from "react";
import { View } from "react-native";

// Component imports
import FlexibleGrid from "../flexible_grid/flexible_grid";
import Video from "./video";
import { Grid, Row, Col } from "../grid";
import ArchiveVideo from "./archive_video";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "../../apis/subscription_db";

// Styles imports
import "./archive_styles.scss";

Amplify.configure(awsmobile);

// Main Archive page component
const ArchivePage = () => {
  const [videos, setVideos] = useState([]); // List of video objects with past show information

  // Asynchronous function to get list of videos from database
  const getArchiveInfo = async () => {
    // Calling the API, using async and await is necessary
    const info = await API.graphql(
      graphqlOperation(queries.list_past_concerts)
    );
    const info_list = info.data.listPastShows.items; // Saves the items from database

    // Iterate through each element in the list and add the created ArchiveVideo to the list
    info_list.forEach((data) => {
      setVideos((videos) => [
        ...videos,
        <ArchiveVideo
          artist_name={data.artist_name}
          concert_name={data.concert_name}
          concert_date={data.concert_date}
          url={data.video_url}
          length={data.video_length}
        />,
      ]);
    });
  };

  // API call is done on mount
  useEffect(() => {
    getArchiveInfo();
  }, []);

  const [is_mobile, setIsMobile] = useState(false); // If mobile should be rendered

  // Gets dimensions of screen and sets state accordingly
  const findDimensions = (layout) => {
    const { width } = layout;
    if (width < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <View
      onLayout={(event) => {
        findDimensions(event.nativeEvent.layout);
      }}
    >
      <div className="archive-page-content">
        {/* <Modal></Modal>
        <SearchBar></SearchBar> */}
        {!is_mobile ? (
          <div className="archive-grid">
            <FlexibleGrid content_list={videos} num_cols={3} />
          </div>
        ) : (
          <div className="archive-grid">
            <FlexibleGrid content_list={videos} num_cols={1} />
          </div>
        )}
      </div>
    </View>
  );
};

export default ArchivePage;
