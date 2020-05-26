// React Imports
import React, { useState, useEffect } from "react";
import { View } from "react-native";
// import { Link } from "react-router-dom";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "../../apis/AppSync";

// Component Imports
import VideoPlayer from "./video_player";
import Chat from "../chat/stream_chat";
import Join from "../chat/join_chat";
import { Grid, Row, Col } from "../grid";
import Modal from "../payment/payment_modal";

// Styles Imports
import "./stream_styles.scss";

// Image imports
import VenmoCode from "../../images/venmo_codes/venmo_code.png";

Amplify.configure(awsmobile);

// Main stream page component. Holds stream video, chat, and payment functionality
const StreamPage = () => {
  const [show_chat, setShowChat] = useState(false); // If chat should be shown
  const [chat_name, setChatName] = useState(""); // Sets user name for chat
  const [email, setEmail] = useState(""); // User email input for subscription
  const [email_submitted, setEmailSubmitted] = useState(false); // If user submitted email
  const [scroll, setScroll] = useState(true); // Auto-scroll
  // const [show_alert, setShowAlert] = useState(true); // If pre-show alert should be shown
  const [is_mobile, setIsMobile] = useState(false); // If mobile should be rendered
  const [show_start_time, setStartTime] = useState("0");
  const [artist_name, setArtistName] = useState("");
  const [concert_name, setConcertName] = useState("");

  // Gets dimensions of screen and sends warnings to console
  const findDimensions = (layout) => {
    const { x, y, width, height } = layout;
    if (width < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.warn(height);
  };

  // Function passed as prop to join chat
  const joinSubmit = (name, mode) => {
    setChatName(name);
    setShowChat(mode);
  };

  // Function passed as prop to chat
  const chatStatus = (mode) => {
    setShowChat(mode);
  };

  // Function when user submits email
  const emailSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      paid: false,
    };

    API.graphql(
      graphqlOperation(mutations.create_email_subscription, { input: payload })
    );

    setEmail("");
    setEmailSubmitted(true);
  };

  // Auto-scrolls on first navigation
  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScroll(false);
  }

  // // Hides popup if closed
  // const hidePopup = () => {
  //   setShowAlert(false);
  // };

  // get the start time for countdown_timer
  useEffect(() => {
    getStartTime();
  }, []);

  const getStartTime = async () => {
    // Calling the API, using async and await is necessary
    const info = await API.graphql(
      graphqlOperation(queries.list_upcoming_concerts)
    );

    const info_list = info.data.listFutureConcerts.items; // Stores the items in database
    setStartTime(info_list[0].date + "T" + info_list[0].time + ".000-04:00");
    setConcertName(info_list[0].concertName);
    setArtistName(info_list[0].artist);
  };

  // Opens link to paypal account for musician
  const donatePaypal = () => {
    const url = "http://paypal.me/jonathandely";
    window.open(url, "_blank");
  };

  return (
    <View
      onLayout={(event) => {
        findDimensions(event.nativeEvent.layout);
      }}
    >
      <div className="stream-page-content">
        {/* {show_alert ? (
          <div>
            <div className="popup-desktop">
              <form className="waiting-msg-box">
                <span className="popup-close" onClick={hidePopup}>
                  <i className="fa fa-times fa-2x close-icon"></i>
                </span>
                <div className="popup-content">
                  <h5 className="popup-header">The show hasn't started yet!</h5>
                  <p className="waiting-msg">
                    Feel free to look around! If you would like to see clips
                    from our past shows, click the button below.
                  </p>
                  <br></br>
                  <Link to="/archive">
                    <button>Go to Past Shows</button>
                  </Link>
                </div>
              </form>
            </div>

            <div className="popup-mobile">
              <form className="waiting-msg-box">
                <span className="popup-close" onClick={hidePopup}>
                  <i className="fa fa-times close-icon"></i>
                </span>
                <div className="popup-content">
                  <h5 className="popup-header">The show hasn't started yet!</h5>
                  <p className="waiting-msg">
                    Feel free to look around! If you would like to see clips
                    from our past shows, click the button below.
                  </p>
                  <br></br>
                  <Link to="/archive">
                    <button>Go to Past Shows</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        ) : null} */}
        {!is_mobile ? (
          <Grid>
            <Row>
              <Col size={0.5}></Col>
              <Col size={7}>
                <div className="stream-main">
                  <div className="stream-wrapper">
                    <VideoPlayer
                      url={
                        "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
                      }
                      start_time={show_start_time}
                      artist_name={artist_name}
                      concert_name={concert_name}
                    />
                  </div>
                </div>
                {/* BELOW IS THE CODE FOR THE ARTIST INFORMATION*/}
                {/* <Row>
                  <Col size={2}>
                    <Row>
                      <h2 className="artist-name">Jonathan Dely</h2>
                    </Row>
                    <Row>
                      <h5 className="show-time">
                        Sunday May 10th 8:00PM EST (refresh the page if stream
                        doesn't show up)
                      </h5>
                    </Row>
                  </Col>
                  <Col size={1} className="social-bar-center">
                    <SocialBar />
                  </Col>
                </Row> */}
              </Col>
              <Col size={3}>
                <div className="chat-main">
                  <div className="chat-wrapper">
                    {show_chat ? (
                      <Chat chat_name={chat_name} chatStatus={chatStatus} />
                    ) : (
                      <Join joinSubmit={joinSubmit} />
                    )}
                  </div>
                </div>
              </Col>
              <Col size={1}></Col>
            </Row>
            <Row>
              <div className="short-term-spacer"></div>
            </Row>

            {/* DONATE ROW */}
            <Row className="donate-row">
              <Col size={1} className="donate-stripe donate-box">
                <p className="donate-description">
                  Click here to donate with a credit card.
                </p>
                <p className="donate-subdescription">
                  Your card information will not be stored anywhere.
                </p>
              </Col>
              <Col size={1} className="donate-paypal donate-box">
                <p className="donate-description">
                  Click here to donate with Paypal.{" "}
                </p>
                <p className="donate-subdescription">
                  Your donation will go directly to Jonathan Dely.
                </p>
              </Col>
              <Col size={1} className="donate-venmo donate-box">
                <p className="donate-description">
                  Scan the QR code below to donate on Venmo.
                </p>
                <p className="donate-subdescription">
                  Your donation will be sent to @Jonathan-Dely on Venmo.
                </p>
              </Col>
            </Row>

            {/* DONATE ROW */}
            <Row className="donate-row-buttons">
              <Col size={1} className="donate-stripe donate-box-button">
                <button
                  className="stripe-button-border button-height"
                  data-toggle="modal"
                  data-target="#paymentModal"
                >
                  Donate with Card
                </button>{" "}
                <Modal></Modal>
              </Col>
              <Col size={1} className="donate-paypal donate-box-button">
                <button
                  className="stripe-button-border button-height paypal-button"
                  onClick={donatePaypal}
                >
                  Donate with Paypal
                </button>
              </Col>
              <Col size={1} className="donate-venmo donate-box-button">
                <img
                  className="venmo-code"
                  src={VenmoCode}
                  alt="venmo-qr"
                ></img>
              </Col>
            </Row>

            <Row>
              <Col size={1} className="stream-subscribe-box">
                <p className="stream-subscribe-title">Subscribe</p>
                <p className="stream-subscribe-description">
                  To stay informed about upcoming events, subscribe to our
                  mailing list:
                </p>
                {(() => {
                  if (email_submitted) {
                    return (
                      <p className="subscribe-success">
                        Thank you and stay tuned!
                      </p>
                    );
                  } else {
                    return (
                      <form
                        class="stream-email-form"
                        action="/"
                        id="newsletter"
                        onSubmit={emailSubmit}
                      >
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
                          className="button-border button-height"
                        >
                          {" "}
                          Submit
                        </button>
                      </form>
                    );
                  }
                })()}
              </Col>
            </Row>
          </Grid>
        ) : (
          <Grid className="mobile-grid-stream">
            <Row>
              <Col size={1}>
                <div className="stream-main-mobile">
                  <div className="stream-wrapper-mobile">
                    <VideoPlayer
                      url={
                        "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
                      }
                      start_time={show_start_time}
                    />
                  </div>
                </div>
                {/* BELOW IS THE CODE FOR THE ARTIST INFORMATION*/}
                {/* <Row>
                  <Col size={1}>
                    <Row>
                      <h2 className="artist-name">Jonathan Dely</h2>
                    </Row>
                    <Row>
                      <h5 className="show-time">Sunday May 10th 8:00PM EST</h5>
                    </Row>
                  </Col>
                </Row>
                <div className="social-bar-mobile">
                  <Row>
                    <Col size={1} className="social-bar-center">
                      <SocialBar />
                    </Col>
                  </Row>
                </div> */}

                <div className="main-content-mobile">
                  {/* PAYMENT SECTION */}
                  <div className="mobile-section">
                    <Row>
                      <Col size={1} className="donate-box-button">
                        <button
                          className="stripe-button-border button-height"
                          data-toggle="modal"
                          data-target="#paymentModal"
                        >
                          Donate with Card
                        </button>{" "}
                        <Modal isOpen={false}></Modal>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={1} className="donate-box-button">
                        <button
                          className="button-border button-height paypal-button"
                          onClick={donatePaypal}
                        >
                          Donate with Paypal
                        </button>
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
                          To stay informed about upcoming events,<br></br>{" "}
                          subscribe to our mailing list:
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={1}>
                        {(() => {
                          if (email_submitted) {
                            return <p>Thank you and stay tuned!</p>;
                          } else {
                            return (
                              <form
                                className="inline-form-2"
                                action="/"
                                id="newsletter"
                                onSubmit={emailSubmit}
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
                                      onChange={(event) =>
                                        setEmail(event.target.value)
                                      }
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
                </div>
              </Col>
            </Row>
          </Grid>
        )}
      </div>
    </View>
  );
};

export default StreamPage;
