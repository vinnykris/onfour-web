import React, { useState, useEffect } from "react";

import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";
import FlexibleGrid from "../flexible_grid/flexible_grid";

// API Imports
import {
  getUpcomingShows,
  getMemories,
  getMostRecentUpcomingInfo,
} from "../../apis/get_user_data";

import "./profile_styles.scss";

const Profile = (props) => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  const variables = props.location.state;
  const [upcoming_concerts, setUpcomingConcerts] = useState([]);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Upcoming shows
      const upcoming_result = await getUpcomingShows(width, variables.username);
      setUpcomingConcerts(upcoming_result.slice(0, 4));

      // Archive videos (sorting from most recent -> oldest)
      const memories_result = await getMemories(variables.username);
      setMemories(
        memories_result
          .sort(
            (a, b) =>
              new Date(b.props.concert_date) - new Date(a.props.concert_date)
          )
          .slice(0, 4)
      );
    };
    fetchData();
  }, []);

  return (
    <div className="profile-page">
      <Grid>
        <Row className="profile-section">
          <Col className="profile-column" size={1}>
            <h4 className="preview-content-header">Hello, {variables.name}!</h4>
          </Col>
        </Row>
        <Row className="profile-section">
          <Col className="profile-column" size={1}>
            <Row>
              <Col size={1}>
                <h4 className="preview-content-header">UPCOMING SHOWS</h4>
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                <FlexibleGrid content_list={upcoming_concerts} num_cols={4} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="profile-section">
          <Col className="profile-column" size={1}>
            <Row>
              <Col size={1}>
                <h4 className="preview-content-header">MY MEMORIES</h4>
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                <FlexibleGrid content_list={memories} num_cols={4} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="profile-section">
          <Col className="profile-column" size={1}>
            <h4 className="preview-content-header">MY CREWS</h4>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Profile;
