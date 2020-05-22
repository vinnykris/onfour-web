// React imports
import React from "react";

// Component imports
import { Grid, Row, Col } from "../grid";

// Styles imports
import "./archive_styles.scss";

// Container for each past performance object
const ArchivePerformanceText = ({
  artist_name,
  concert_name,
  date,
  video_length,
}) => {
  return (
    <Grid>
      <Row>
        <Col size={1}>
          <h4 className="archive-video-header">
            {artist_name} - {concert_name} | {date}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col size={1}>
          <h4 className="archive-video-header">{video_length}</h4>
        </Col>
      </Row>
    </Grid>
  );
};

export default ArchivePerformanceText;
