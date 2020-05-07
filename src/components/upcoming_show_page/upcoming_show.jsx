import React from "react";
import { Grid, Row, Col } from "../grid";
import MonthHeader from "./month_header";
import "./upcoming_show_page_styles.scss";
import background from "../../images/home_page_background.jpeg";
import concert from "../../images/concert_placeholder.jpeg";
import artist from "../../images/artist_placeholder.jpg";
import FeaturedContent from "./featured_content";

const upcoming_show = () => {
    return (
        <div>
            <Grid>
                <Row>
                </Row>
                <Row>
                    <Col size={1}> </Col>
                    <Col size={4}>
                        <MonthHeader headerTitle={"Featured Concerts"} />
                    </Col>
                    <Col size={1}> </Col>
                </Row>
                <Row>
                    <Col size={1}></Col>
                    <Col size={1}>
                        <FeaturedContent img={concert} />
                    </Col>
                    <Col size={1}>
                        <FeaturedContent img={concert} />
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row>
                    <Col size={1}></Col>
                    <Col size={1}>
                        <FeaturedContent img={concert} />
                    </Col>
                    <Col size={1}>
                        <FeaturedContent img={concert} />
                    </Col>
                    <Col size={1}></Col>
                </Row>
                <Row>
                    <Col size={1}>
                        <MonthHeader headerTitle={"Featured Artists"} />
                    </Col>
                </Row>
                <Row>
                    <Col size={1}></Col>
                    <Col size={1}>
                        <FeaturedContent img={artist} />
                    </Col>
                    <Col size={1}>
                        <Row>
                            <Col size={1}>
                                <FeaturedContent img={artist} />
                            </Col>
                            <Col size={1}>
                                <FeaturedContent img={artist} />
                            </Col>
                        </Row>
                        <Row>
                            <Col size={1}>
                                <FeaturedContent img={artist} />
                            </Col>
                            <Col size={1}>
                                <FeaturedContent img={artist} />
                            </Col>
                        </Row>
                    </Col>
                    <Col size={1}></Col>
                </Row>
            </Grid>
        </div>
    );
}

export default upcoming_show;