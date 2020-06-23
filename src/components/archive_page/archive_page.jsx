// React imports
import React, { useState, useEffect } from "react";

// Component imports
import FlexibleGrid from "../flexible_grid/flexible_grid";
import ArchiveVideo from "./archive_video";
import { useWindowDimensions } from "../custom_hooks";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

// Styles imports
import "./archive_styles.scss";

Amplify.configure(awsmobile);

// Main Archive page component
const ArchivePage = () => {
  const [scroll, setScroll] = useState(true); // State Variable for auto scroll to the top
  // Auto scroll to the top on page load
  if (scroll) {
    window.scrollTo({ top: 0 });
    setScroll(false);
  }

  const [videos, setVideos] = useState([]); // List of video objects with past show information

  // Asynchronous function to get list of videos from database
  const getArchiveInfo = async () => {
    // Calling the API, using async and await is necessary
    const info = await API.graphql(
      graphqlOperation(queries.list_past_concerts)
    );
    const info_list = info.data.listPastShows.items; // Saves the items from database

    // Iterate through each element in the sorted list and add the created ArchiveVideo to the list
    info_list
      .sort((a, b) => new Date(b.concert_date) - new Date(a.concert_date))
      .forEach((data) => {
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
  // Add in Analytics that archive page was visited
  useEffect(() => {
    getArchiveInfo();
    archivePageVisit();
    Auth.currentAuthenticatedUser({}).then((user) => {
      authenticatedArchivePageVisit();
    });
  }, []);
  const archivePageVisit = () => {
    Analytics.record({ name: "totalArchivePageVisits" });
  };

  // Record in analytics that archive page was visited only if user is logged in
  const authenticatedArchivePageVisit = () => {
    Analytics.record({ name: "totalAuthenticatedArchivePageVisits" });
  };

  // DETERMINE MOBILE VERSION OR NOT
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  return (
    <div className="archive-page-content">
      {/* <Modal></Modal>
      <SearchBar></SearchBar> */}
      {width > 600 ? (
        <div className="archive-grid">
          <FlexibleGrid content_list={videos} num_cols={3} />
        </div>
      ) : (
        <div className="archive-grid">
          <FlexibleGrid content_list={videos} num_cols={1} />
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
