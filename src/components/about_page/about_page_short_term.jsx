// Main Imports
import React, { useState } from "react";
import { Grid, Row, Col } from "../grid";
import history from "../../history";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../../AppSync";

// Image Imports
import header_image from "../../images/banner_background_blur.jpg";
import gradient_header from "../../images/mobile_gradient.png";

// Styling Imports
import "./about_styles.scss";

Amplify.configure(awsmobile);

const AboutPage = () => {
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);
  const [scroll, setScroll] = useState(true);

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
    setClicked(true);
  };

  if (scroll) {
    window.scrollTo({ top: 0 });
    setScroll(false);
  }

  const sendEmail = () => {
    const url = "mailto:onfour.box@gmail.com";
    window.open(url, "_blank");
  };

  return (
    <div className="about-page-content">
      <Grid className="desktop-grid-about">
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <img
                className="banner-header-desktop"
                src={header_image}
                alt="nav-logo"
              ></img>
              <h1 className="header-tag">Reimagining live music.</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>
        <Row>
          <Col size={1}>
            <h3 className="our-mission-text"> Our Mission </h3>
          </Col>
        </Row>
        <Row>
          <Col size={1}> </Col>
          <Col size={4}>
            <p className="description-text">
              Onfour is the premier live-streaming concert platform, built and
              designed for musicians. We are dedicated to empowering musicians
              and enabling them to connect with fans in new, meaningful ways.
              Experience studio-like quality from the comfort of your own home.
              <br></br>
              <br></br>
              Due to the COVID-19 pandemic, we are hosting live-stream concerts
              and will donate all of our proceeds to{" "}
              <a
                href="https://www.grammy.com/musicares/donations"
                target="_blank"
                rel="noopener noreferrer"
              >
                MusiCares
              </a>{" "}
              to help relieve musicians during this difficult time.
            </p>
            <Row>
              <Col size={1}>
                <button
                  onClick={() => history.push("/stream")}
                  className="button-on-black"
                >
                  Tune into the stream!
                </button>
              </Col>
            </Row>
          </Col>
          <Col size={1}> </Col>
        </Row>

        <Row>
          <div className="short-term-spacer"></div>
        </Row>

        <Row>
          <Col size={1} className="perform-box">
            <p className="perform-title">Perform</p>
            <p className="perform-description">
              Want to perform a livestream concert with Onfour? <br></br>Send us
              an email and we will get back to you soon!
            </p>
            <a
              href="mailto:onfour.box@gmail.com"
              target="_blank"
              className="email-link"
              rel="noopener noreferrer"
            >
              <button className="email-button">Send us an Email</button>
            </a>
          </Col>

          <Col size={1} className="subscribe-box">
            <div>
              <p className="subscribe-title">Subscribe</p>
              <p className="subscribe-description">
                To stay informed about upcoming events,<br></br> subscribe to
                our mailing list:
              </p>
              {(() => {
                if (clicked) {
                  return <div>Thank you and stay tuned! :)</div>;
                } else {
                  return (
                    <form
                      className="inline-form-2"
                      action="/"
                      id="newsletter"
                      onSubmit={onSubmit}
                    >
                      <div>
                        <input
                          type="email"
                          placeholder="Enter your email here..."
                          name="email"
                          required
                          value={email}
                          className="email-input"
                          // style={{ width: "280px" }}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <button
                          type="submit"
                          form="newsletter"
                          value="Submit"
                          className="submit-button button-border button-height"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  );
                }
              })()}
            </div>
          </Col>
        </Row>
      </Grid>

      <Grid className="mobile-grid-about">
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <img
                className="banner-header-mobile"
                src={gradient_header}
                alt="nav-logo"
              ></img>
            </div>
          </Col>
        </Row>
        <div className="main-content-mobile">
          {/* MISSION ROW */}
          <div className="mobile-section">
            <Row>
              <Col size={1}>
                <h3 className="header-mobile"> Our Mission </h3>
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                <p className="description-text-mobile">
                  Onfour is the premier live-streaming concert platform, built
                  and designed for musicians. We are dedicated to empowering
                  musicians and enabling them to connect with fans in new,
                  meaningful ways. Experience studio-like quality from the
                  comfort of your own home.
                  <br></br>
                  <br></br>
                  Due to the COVID-19 pandemic, we are hosting live-stream
                  concerts and will donate all of our proceeds to{" "}
                  <a
                    href="https://www.grammy.com/musicares/donations"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MusiCares
                  </a>{" "}
                  to help relieve musicians during this difficult time.
                </p>
              </Col>
            </Row>
          </div>

          {/* SUBSCRIBE ROW */}
          <div className="mobile-section">
            <Row>
              <Col size={1}>
                <h3 className="header-mobile">Subscribe</h3>
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                <p className="description-text-mobile">
                  To stay informed about upcoming events,<br></br> subscribe to
                  our mailing list:
                </p>
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                {(() => {
                  if (clicked) {
                    return <p>Thank you and stay tuned!</p>;
                  } else {
                    return (
                      <form
                        className="inline-form-2"
                        action="/"
                        id="newsletter"
                        onSubmit={onSubmit}
                      >
                        <Row>
                          <Col size={4}>
                            <input
                              type="email"
                              placeholder="Enter email here..."
                              name="email"
                              required
                              value={email}
                              className="email-input"
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </Col>
                          <Col size={1}>
                            <button
                              type="submit"
                              form="newsletter"
                              value="Submit"
                              className="submit-button button-border button-height"
                            >
                              Submit
                            </button>
                          </Col>
                        </Row>
                      </form>
                    );
                  }
                })()}
              </Col>
            </Row>
          </div>

          {/* PERFORM ROW */}
          <div className="mobile-section">
            <Row>
              <Col size={1}>
                <Row>
                  <Col size={1}>
                    <h3 className="header-mobile">Perform</h3>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <p className="description-text-mobile">
                      Want to perform a livestream concert with Onfour?{" "}
                      <br></br>
                      Send us an email and we will get back to you soon!
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <button
                      type="submit"
                      form="newsletter"
                      value="Submit"
                      className="email-button-mobile button-border button-height"
                      onClick={sendEmail}
                    >
                      Send us an email
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Grid>
    </div>
  );
};
export default AboutPage;
