import React from "react";
import { Grid, Row, Col } from "../grid";

import "./archive_styles.scss";

const ArchivePerformance = ({ artistName, concertName, date, videoLength }) => {
  return (
    <Grid>
      <Row>
        <Col size={1}>
          <h4 className="archive-video-header">
            {artistName} - {concertName} | {date}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col size={1}>
          <h4 className="archive-video-header">{videoLength}</h4>
        </Col>
      </Row>
    </Grid>
  );
};

export default ArchivePerformance;
