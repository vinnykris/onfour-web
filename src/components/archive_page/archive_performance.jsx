import React from "react";
import { Grid, Row } from "../grid";

import "./archive_styles.scss";

const ArchivePerformance = ({ artistName, date }) => {
  return (
    <Grid>
      <Row>
        <h4 className="archive-header">
          {artistName}: {date}
        </h4>
      </Row>
    </Grid>
  );
};

export default ArchivePerformance;
