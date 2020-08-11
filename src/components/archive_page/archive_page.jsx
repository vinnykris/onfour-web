// React imports
import React, { useState, useEffect } from "react";

// Component imports
import FlexibleGrid from "../flexible_grid/flexible_grid";
import { useWindowDimensions } from "../custom_hooks";
import { formatArchiveVideos } from "../util";

// AWS Imports
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

// API Imports
import { getArchiveInfo } from "../../apis/get_concert_data";

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

  // API call is done on mount
  // Add in Analytics that archive page was visited
  useEffect(() => {
    const fetchData = async () => {
      const archive_result = await getArchiveInfo();
      setVideos(formatArchiveVideos(archive_result));
    };
    fetchData();
    // getArchiveInfo();
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
