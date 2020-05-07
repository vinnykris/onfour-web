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
          <ReactPlayer className="archive-video" url={src} controls />
        </Col>
      </Row>
    </Grid>
  );
};

export default ArchiveVideo;
