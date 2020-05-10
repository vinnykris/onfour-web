import React from "react";
import { Grid, Row, Col } from "../grid";
import ArchiveVideo from "./archive_video";
import ArchivePerformance from "./archive_performance";

import "./archive_styles.scss";

const ArchivePage = () => {
  return (
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
                songName="4/24/20 Jonathan Dely-My Funny Valentine"
              />
            </Col>
          </Row>
          <div className="spacer"></div>
          <Row>
            <Col size={1}>
              <ArchiveVideo
                src="https://www.youtube.com/embed/EOgrorpN9rw"
                songName="4/24/20 Jonathan Dely-Strasbourg/St. Denis"
              />
            </Col>
          </Row>
          <div className="spacer"></div>
        </div>
      </Grid>
    </div>
  );
};

export default ArchivePage;
