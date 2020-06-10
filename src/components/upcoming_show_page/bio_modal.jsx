// React Imports
import React, { useState } from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

const bioModal = ({ days_left, artist_name, concert_name }) => {

    return (
        <Grid>
            <Col size={3}>
                <Row>
                    <div className="modal-date">IN { days_left } DAYS</div>
                </Row>
                <br></br>
                <Row>
                    <div className="modal-bio-title">{artist_name.toUpperCase()} - {concert_name.toUpperCase() }</div>
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