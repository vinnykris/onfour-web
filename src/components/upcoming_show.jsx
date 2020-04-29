import React, { useState } from "react";
import "../styles.scss";
import { Grid, Row, Col } from "./grid";

const upcoming_show = () => {
    return (
        <div>
            <Grid>
                <Row>
                    <Col size={1}></Col>
                    <Col size={7}>
                        <div className="one_show">

                        </div>
                    </Col>
                    <Col size={1}></Col>
                </Row>
            </Grid>
        </div>
    );
}

export default upcoming_show;