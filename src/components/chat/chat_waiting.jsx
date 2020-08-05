// React imports
import React from "react";

// Component imports
import { Grid, Row, Col } from "../../components/grid";

// Styles imports
import "./chat.scss";

//
const WaitingChat = () => {
    return (
        <div className="join-outer-container">
            <Grid className="join-chat-grid">
                <Row className="full-row">
                    <Col size={1}></Col>
                    <Col size={2}>
                        <div className="join-inner-container">
                            <Row>
                                <Col size={1}>
                                    <h4 className="heading">Please Sign In to Join the Chat</h4>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col size={1}></Col>
                </Row>
            </Grid>
        </div>
    );
};

export default WaitingChat;
