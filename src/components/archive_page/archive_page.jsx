// React imports
import React, { useState, useEffect } from "react";

// Component imports
import FlexibleGrid from "../flexible_grid/flexible_grid";
import Video from "./video";

// Styles imports
import "./archive_styles.scss";

// Main Archive page component
const ArchivePage = () => {
  const [videos, setVideos] = useState(["X", "X"]); // List of video objects with past show information

  useEffect(() => {
    // DO API CALL HERE
    // TEMPORARILY HARD CODE LIST
  }, []);

  return (
    <div className="archive-page-content">
      <FlexibleGrid content_list={videos} num_cols={3} />
    </div>
  );
};

export default ArchivePage;
