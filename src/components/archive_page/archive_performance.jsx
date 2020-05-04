import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Grid, Row, Col } from "../grid";

import "./archive_styles.scss";

const ArchivePerformance = ({ artistName, date }) => {
  return (
    <Grid>
      <Row>
        <h4 className="archive-header">
          {artistName}: {date}
        </h4>
        {/* <h3 className="archive-artist">{date}</h3> */}
      </Row>
    </Grid>
    // <div>

    // </div>
  );
};

export default ArchivePerformance;
