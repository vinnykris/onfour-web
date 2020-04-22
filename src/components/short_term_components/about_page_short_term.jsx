import React from "react";
import whatsonfour from "../../images/whatsonfour_background.jpg";
import "../../styles.scss";
import { Grid, Row, Col } from "../grid";
import history from "../../history";

const WhatsOnFour = () => {
  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <Row>
                <Col size={1}>
                  <button onClick={() => history.push("/stream")}>
                    Tune into the stream!
                  </button>
                </Col>
              </Row>
              <img
                className="bannerbackground"
                src={whatsonfour}
                alt="nav-logo"
              ></img>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="short-term-spacer"></div>
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
              proceeds to{" "}
              <a
                href="https://www.grammy.com/musicares/donations"
                target="_blank"
              >
                MusiCares
              </a>{" "}
              to help relieve musicians during this difficult time.
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
            <form class="inline-form" action="/" id="newsletter">
              <input
                type="email"
                placeholder="Enter your email here..."
                name="email"
                required
              />
              <button type="submit" form="newsletter" value="Submit">
                Submit
              </button>
            </form>
          </Col>
          <Col size={2}></Col>
        </Row>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={2}>
            <p className="description-text">
              Want to perform a livestream concert with Onfour? <br></br>Email
              us at{" "}
              <a href="mailto:onfour.box@gmail.com" target="_blank">
                onfour.box@gmail.com
              </a>
            </p>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>
      </Grid>
    </div>
  );
};
export default WhatsOnFour;
