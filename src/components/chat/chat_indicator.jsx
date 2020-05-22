// React imports
import React from "react";

// Component imports
import { Grid, Row, Col } from "../grid";

// Image imports
import online_icon from "../../images/online_icon.png";

// Styles imports
import "./chat.scss";

// Component that holds information regarding the number of users online
const ChatIndicator = ({ users }) => (
  <div className="chat-indicator mt-20">
    {users ? (
      <Grid>
        <Row>
          <Col size={2}></Col>
          <Col size={1}>
            <img className="online-icon" src={online_icon} alt="online" />
            <h6>{users.length}</h6>
          </Col>
          <Col size={2}></Col>
        </Row>
      </Grid>
    ) : null}
  </div>
);

export default ChatIndicator;
