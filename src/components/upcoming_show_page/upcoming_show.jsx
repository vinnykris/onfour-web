import React from "react";
import { Grid, Row, Col } from "../grid";
import MonthHeader from "./month_header";
import "./upcoming_show_page_styles.scss";
import concert from "../../images/concert_placeholder.jpeg";
import FeaturedContent from "./featured_content";

const upcoming_show = () => {
    return (
        <div>
            <Grid>
                <Row>
                </Row>
                <Row>
                    <Col size={0.5}> </Col>
                    <Col size={2}>
                        <MonthHeader headerTitle={"May 2020"} />
                    </Col>
                    <Col size={2}> </Col>
                    <Col size={2}> </Col>
                    <Col size={0.5}> </Col>
                </Row>
                <Row>
                    <Col size={0.5}></Col>
                    <Col size={2}>
                        <FeaturedContent img={concert} name={"Jonathan Dely"} date={"05/10/2020"} time={"8PM EST"} />
                    </Col>
                    <Col size={2}>
                        <FeaturedContent img={concert} name={"Jonathan Dely"} date={"05/10/2020"} time={"8PM EST"} />
                    </Col>
                    <Col size={2}>
                        <FeaturedContent img={concert} name={"Jonathan Dely"} date={"05/10/2020"} time={"8PM EST"} />
                    </Col>
                    <Col size={0.5}></Col>
                </Row>
            </Grid>
        </div>
    );
}

export default upcoming_show;