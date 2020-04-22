import React, { useState } from "react";
import background from "../../images/home_page_background.jpeg";
import "../../styles.scss";
import { Grid, Row, Col } from "../grid";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../../AppSync";

Amplify.configure(awsmobile);

const WhatsOnFour = () => {
  const [email, setEmail] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      paid: false,
    };

    API.graphql(
      graphqlOperation(mutations.createOnfour_current, { input: payload })
    );

    setEmail("");
  };

  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <img
                className="bannerbackground"
                src={background}
                alt="nav-logo"
              ></img>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="spacer"></div>
        </Row>
        <Row>
          <Col size={1}>
            <h2> Our Mission </h2>
          </Col>
        </Row>
        <Row>
          <Col size={1}> </Col>
          <Col size={2}>
            <p className="description-text">
              Onfour empowers music fans by providing a new way to interact with
              your favorite musicians, no matter where you are. Musicians gain
              more control over their careers and connect with fans in new,
              meaningful ways.
            </p>
            <p className="description-text">
              We will bring fans together in local, non-traditional venues to
              experience live music, together. However, due to the COVID-19
              pandemic, we are hosting live-stream concerts and will donate our
              proceeds to MusiCares.org to help relieve musicians during this
              difficult time.
            </p>
            <hr className="line-divider"></hr>
          </Col>
          <Col size={1}> </Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={2}>
            <p className="description-text">
              To stay informed about upcoming events, subscribe to our mailing
              list:
            </p>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={2}></Col>
          <Col size={1}>
            <form action="/" id="newsletter" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="Enter your email here..."
                name="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" form="newsletter" value="Submit">
                Submit
              </button>
            </form>
          </Col>
          <Col size={2}></Col>
        </Row>
        <Row>
          <div className="spacer"></div>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={2}>
            <p className="description-text">
              Want to perform a livestream concert with Onfour? <br></br>Email
              us at{" "}
              <a href="mailto:onfour.box@gmail.com">onfour.box@gmail.com</a>
            </p>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <div className="spacer"></div>
        </Row>
      </Grid>
    </div>
  );
};
export default WhatsOnFour;
