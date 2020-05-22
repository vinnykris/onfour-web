// React imports
import React from "react";
import ReactPlayer from "react-player";

// Component imports
import { Grid, Row, Col } from "../grid";

// Styles imports
import "./archive_styles.scss";

// Component that contains video and performance text
const ArchiveVideo = ({ src, song_name }) => {
  return (
    <Grid>
      <Row>
        <h5 className="archive-artist">{song_name}</h5>
      </Row>
      <Row>
        <Col size={1}>
          <div className="archive-player-desktop">
            <ReactPlayer className="archive-video" url={src} controls />
          </div>
          <div className="archive-player-mobile">
            <ReactPlayer
              className="archive-video"
              width="100%"
              height="100%"
              url={src}
              controls
            />
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default ArchiveVideo;
