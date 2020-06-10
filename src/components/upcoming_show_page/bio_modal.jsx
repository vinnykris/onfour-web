// React Imports
import React, { useState } from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

const bioModal = ({days}) => {
    return (
        <Grid>
            <Col size={3}>
                <Row>
                    <div className="modal-date">IN {days} DAYS</div>
                </Row>
            </Col>
            <Col size={2}>

            </Col>
            <Row>

            </Row>
        </Grid>
    );
}

export default bioModal;