import React from "react";
import "./chat.scss";
import onlineIcon from "../../images/onlineIcon.png";
import { Grid, Row, Col } from "../grid";

const ChatIndicator = ({ users }) => (
  <div className="chat-indicator mt-20">
    {users ? (
      <Grid>
        <Row>
          <Col size={2}></Col>
          <Col size={1}>
            <img className="online-icon" src={onlineIcon} alt="online" />
            <h6>{users.length}</h6>
          </Col>
          <Col size={2}></Col>
        </Row>
      </Grid>
    ) : null}
  </div>
);

export default ChatIndicator;
