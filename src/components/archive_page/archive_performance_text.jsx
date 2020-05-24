// React imports
import React, { useState, useEffect } from "react";

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
  const [mins, setMins] = useState("");
  const [formatted_date, setFormattedDate] = useState("");

  useEffect(() => {
    if (video_length) {
      let minutes = Math.floor(video_length / 60);
      let seconds = video_length % 60;
      setMins(minutes + ":" + seconds);
    }
    if (date) {
      let year = date.slice(0, 4);
      console.log(year);
      let month = date.slice(5, 7);
      console.log(month);
      let day = date.slice(8, 10);
      console.log(day);
      setFormattedDate(month + "." + day + "." + year);
    }
  }, []);

  return (
    <Grid>
      <Row>
        <Col size={1}>
          <h4 className="archive-video-header">
            {artist_name} - {concert_name} | {formatted_date}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col size={1}>
          <h4 className="archive-video-header">{mins}</h4>
        </Col>
      </Row>
    </Grid>
  );
};

export default ArchivePerformanceText;
