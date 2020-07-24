import React from "react";
import "./CallMessage.css";
import { Grid, Row, Col } from "../../grid";

/**
 * Props:
 * - header: string
 * - detail: string
 * - isError: boolean
 */
export default function CallMessage(props) {
  return (
    <Grid className={"call-message" + (props.isError ? " error" : "")}>
      <Row className="call-message-container">
        <Col className="call-message-container">
          <Row>
            <div className="call-message-header">{props.artistView? ("Your fans will join soon!") : props.header}</div>
          </Row>
          <Row>
            <div className="call-message-content">{props.artistView? null : props.detail}</div>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}
