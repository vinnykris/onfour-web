import React from "react";
import ReactPlayer from "react-player";
import { Grid, Row, Col } from "../grid";

import "./archive_styles.scss";

const ArchiveVideo = ({ src, songName }) => {
  return (
    <Grid>
      <Row>
        <h5 className="archive-artist">{songName}</h5>
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
