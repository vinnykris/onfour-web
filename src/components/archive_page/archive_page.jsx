// React imports
import React, { useState, useEffect } from "react";

// Component imports
import FlexibleGrid from "../flexible_grid/flexible_grid";
import Video from "./video";
import { Grid, Row, Col } from "../grid";
import ArchiveVideo from "./archive_video";

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
      {/* <FlexibleGrid content_list={videos} num_cols={3} /> */}
      <div className="stream-page-content">
        <Grid>
          <div className="spacer"></div>
          {/* <Row>
          <h2 className="archive-page-title">Past Onfour Shows</h2>
        </Row> */}
          <div className="archive-performance-wrapper">
            {/* <Row>
            <Col size={1}>
              <ArchivePerformance artistName="Jonathan Dely" date="4/24/20" />
            </Col>
          </Row> */}
            <Row>
              <Col size={1}>
                <ArchiveVideo
                  src="https://www.youtube.com/embed/3HZOv5TDoY4"
                  song_name="4/24/20 Jonathan Dely-My Funny Valentine"
                />
              </Col>
            </Row>
            <div className="spacer"></div>
            <Row>
              <Col size={1}>
                <ArchiveVideo
                  src="https://www.youtube.com/embed/EOgrorpN9rw"
                  song_name="4/24/20 Jonathan Dely-Strasbourg/St. Denis"
                />
              </Col>
            </Row>
            <div className="spacer"></div>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default ArchivePage;
