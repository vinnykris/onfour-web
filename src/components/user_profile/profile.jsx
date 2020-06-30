import React, { useState, useEffect } from "react";

import { Grid, Row, Col } from "../grid";

import "./profile_styles.scss";

const Profile = (props) => {
  const variables = props.location.state;

  return (
    <div className="profile-page">
      <Grid>
        <Row className="profile-section">
          <Col>
            <h4 className="preview-content-header">Hello, {variables.name}!</h4>
          </Col>
        </Row>
        <Row className="profile-section">
          <Col>
            <h4 className="preview-content-header">UPCOMING SHOWS</h4>
          </Col>
        </Row>
        <Row className="profile-section">
          <Col>
            <h4 className="preview-content-header">MY MEMORIES</h4>
          </Col>
        </Row>
        <Row className="profile-section">
          <Col>
            <h4 className="preview-content-header">MY CREWS</h4>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Profile;
