import React, { useState } from "react";
import background from "../../images/home_page_background.jpeg";
import "../../styles.scss";
import { Grid, Row, Col } from "../grid";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../../AppSync";
import whatsonfour from "../../images/bannerbackground-blur.jpg";
import history from "../../history";

Amplify.configure(awsmobile);

const WhatsOnFour = () => {
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

  return (
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <img
                className="bannerbackground"
                src={whatsonfour}
                alt="nav-logo"
              ></img>

              <h1>Live-streamed concerts, reimagined</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>
        <Row>
          <Col size={1}>
            <h3> Our Mission </h3>
          </Col>
        </Row>
        <Row>
          <Col size={1}> </Col>
          <Col size={2}>
            <p className="description-text">
              Onfour empowers music fans by providing a new way to interact with
              your favorite musicians, no matter where you are. Musicians gain
              more control over their careers and connect with fans in new,
              meaningful ways. We will bring fans together in local,
              non-traditional venues to experience live music, together.
              However, due to the COVID-19 pandemic, we are hosting live-stream
              concerts and will donate our proceeds to{" "}
              <a
                href="https://www.grammy.com/musicares/donations"
                target="_blank"
              >
                MusiCares
              </a>{" "}
              to help relieve musicians during this difficult time.
            </p>
            <Row>
              <Col size={1}>
                <button
                  onClick={() => history.push("/stream")}
                  className="buttonborder"
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
          <Col size={1} className="performbox">
            <p className="performtitle">Perform</p>
            <p className="performdescribtion">
              Want to perform a livestream concert with Onfour? <br></br>Send us
              an email and we will get back to you soon!
            </p>
            <button className="emailbutton">
              <a
                href="mailto:onfour.box@gmail.com"
                target="_blank"
                className="emaillink"
              >
                <p className="email-p">Send us an Email </p>
              </a>
            </button>
          </Col>

          <Col size={1} className="subscribebox">
            <p className="subscribetitle">Subscribe</p>
            <p className="subscribedescribtion">
              To stay informed about upcoming events,<br></br> subscribe to our
              mailing list:
            </p>
            {(() => {
              if (clicked) {
                return <div>Thank you and stay tuned! :)</div>;
              } else {
                return (
                  <form
                    className="inline-form"
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
                        style={{ width: "280px" }}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <button
                        type="submit"
                        form="newsletter"
                        value="Submit"
                        style={{ width: "100px" }}
                        className="buttonborder buttonheight"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                );
              }
            })()}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};
export default WhatsOnFour;
