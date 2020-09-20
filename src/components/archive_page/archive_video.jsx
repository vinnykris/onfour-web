// React imports
import React from "react";
import ReactPlayer from "react-player";

// Component imports
import { Grid, Row, Col } from "../grid";
import ArchivePerformanceText from "./archive_performance_text";

// Styles imports
import "./archive_styles.scss";

// Component that contains video and performance text
const ArchiveVideo = ({
  artist_name,
  concert_name,
  concert_date,
  url,
  length,
}) => {
  return (
    <Grid className="archive-container">
      <Row>
        <Col size={1}>
          <ReactPlayer
            className="archive-video"
            url={url}
            controls
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                },
              },
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col size={1}>
          <ArchivePerformanceText
            artist_name={artist_name}
            // concert_name={concert_name}
            date={concert_date}
            video_length={length}
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default ArchiveVideo;
