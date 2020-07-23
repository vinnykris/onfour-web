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
  const [mins, setMins] = useState(""); // String value of time in minutes format
  const [formatted_date, setFormattedDate] = useState(""); // String value of date in American format

  // On mount, format the time and date properly (if fields are provided)
  useEffect(() => {
    if (video_length) {
      let minutes = Math.floor(video_length / 60);
      let seconds = video_length % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      setMins(minutes + ":" + seconds);
    }
    if (date) {
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let day = date.slice(8, 10);
      setFormattedDate(month + "." + day + "." + year);
    }
  }, [video_length, date]);

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
