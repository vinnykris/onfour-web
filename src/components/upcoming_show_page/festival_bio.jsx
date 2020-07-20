// React Imports
import React, { useState } from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

const festivalBio = ({img, name, bio, num}) => {

    const toggle = () => {
        if (document.getElementById("bio" + num)) {
            // console.log(document.getElementById("load_more").textContent === "read more");
            if (document.getElementById("load_more" + num).textContent === "read more") {
                document.getElementById("bio" + num).style.height = "100%";
                document.getElementById("load_more" + num).textContent = "show less"
            } else if (document.getElementById("load_more" + num).textContent === "show less") {
                document.getElementById("bio" + num).style.height = "6vw";
                document.getElementById("load_more" + num).textContent = "read more";
            }
            
        }
    };


    return (
        <Row className="festival-row">
            <Col size={1}>
                <img className="festival-image" src={img}></img>
            </Col>
            <Col size={5} className="festival-bio-col">
                <Row>
                    <div className="festival-bio-name">{name}</div>
                </Row>
                <Row>
                    <div className="festival-bio" id={"bio" + num}>{bio}</div>
                </Row>
                <Row>
                    <div className="festival-read-more" id={"load_more" + num} onClick={toggle}>read more</div>
                </Row>
            </Col>
        </Row>
    );
}

export default festivalBio;