// React Imports
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { Prompt } from "react-router";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "../../apis/AppSync";
// Amplify Imports
import Auth from "../../apis/UserPool";

// Component Imports
import VideoPlayer from "./video_player";
import Chat from "../chat/stream_chat";
// import Join from "../chat/join_chat";
import WaitingChat from "../chat/chat_waiting";
import { Grid, Row, Col } from "../grid";
// import SocialBar from "../social_bar/social_bar";
import Modal from "../payment/payment_modal";
import { useWindowDimensions } from "../custom_hooks";

// Styles Imports
import "./stream_styles.scss";

// Image imports
import VenmoCode from "../../images/venmo_codes/onfour_venmo.jpeg";

Amplify.configure(awsmobile);

// Main stream page component. Holds stream video, chat, and payment functionality
const StreamPage = () => {
  // DETERMINE MOBILE VERSION OR NOT
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // CHAT SECTION
  const [show_chat, setShowChat] = useState(false); // If chat should be shown
  const [chat_name, setChatName] = useState(""); // Sets user name for chat
  // Function passed as prop to join chat
  const joinSubmit = (name, mode) => {
    setChatName(name);
    // setShowChat(mode);
  };
  // Function passed as prop to chat
  const chatStatus = (mode) => {
    setShowChat(mode);
  };

  // EMAIL SUBSCRIBTION SECTION
  const [email, setEmail] = useState(""); // User email input for subscription
  const [email_submitted, setEmailSubmitted] = useState(false); // If user submitted email
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

  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true); // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScroll(false);
  }

  // POP_UP WARNING SECTION
  // const [show_alert, setShowAlert] = useState(true); // If pre-show alert should be shown
  // // Hides popup if closed
  // const hidePopup = () => {
  //   setShowAlert(false);
  // };

  // GETTING INFORMATION ABOUT MOST RECENT UPCOMING SHOW
  const [show_start_time, setStartTime] = useState(""); // Stores the upcoming show's start time
  const [artist_name, setArtistName] = useState(""); // Stores the upcoming show's artist name
  const [concert_name, setConcertName] = useState(""); // Stores the upcoming show's concert name
  const [concert_id, setConcertID] = useState("");
  // Get the start time for countdown_timer
  useEffect(() => {
    getStartTime();
  }, []);
  // Query upcoming show database
  const getStartTime = async () => {
    // Calling the API, using async and await is necessary
    const info = await API.graphql(
      graphqlOperation(queries.list_upcoming_concerts)
    );

    const info_list = info.data.listFutureConcerts.items; // Stores the items in database
    info_list.sort((a, b) => a.timePassed - b.timePassed);
    setStartTime(info_list[0].date + "T" + info_list[0].time + ".000-04:00");
    setConcertName(info_list[0].concertName);
    setArtistName(info_list[0].artist);
    setConcertID(info_list[0].concertId);
  };

  // GET USER'S REGISTRATION INFORMATION
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [user_email, setUserEmail] = useState(""); // Tracks user's email after signing in
  const [username, setUsername] = useState(""); // Username from login
  const [user_id, setUserID] = useState(""); // Tracks user's id of signed in user
  const [first, setFirst] = useState(""); // Tracks first name of signed in user
  const [last, setLast] = useState(""); // Tracks last name of signed in user

  // If the user is logged in/valid, set their auth value to true and track their email
  // If the user is not logged in/invalid, reset their auth value to false
  Auth.currentAuthenticatedUser({})
    .then((user) => setUserEmail(user.attributes.email))
    .then((user) => setAuth(true))
    .catch((err) => setAuth(false));

  // If the first name for the logged in user's email has not been retrieved yet,
  // query the registration database's table to retrieve the first name filtered
  // for the specific email and assign that value to first
  if (first === "" && user_email !== "") {
    API.graphql(
      graphqlOperation(queries.query_name, {
        filter: { email: { eq: user_email } },
      })
    ).then((data) => {
      setUsername(data.data.listCreateOnfourRegistrations.items[0].username);
      setFirst(data.data.listCreateOnfourRegistrations.items[0].first);
      setLast(data.data.listCreateOnfourRegistrations.items[0].last);
      setUserID(data.data.listCreateOnfourRegistrations.items[0].id);
      setShowChat(true);
    });
  }

  // DONATION FUNCTION
  // Opens link to paypal account for musician
  const donatePaypal = () => {
    const url = "https://www.paypal.me/onfourdonations";
    window.open(url, "_blank");
  };

  // RENDERING SECTION
  return (
    <div className="stream-container">
      {show_start_time ? (
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
          {width > 600 ? (
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
                        auth={auth}
                        user_id={user_id}
                        concert_id={concert_id}
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
                      {username ? (
                        <Chat
                          chat_name={username ? username : chat_name}
                          chatStatus={chatStatus}
                        />
                      ) : (
                        // <Join joinSubmit={joinSubmit} />
                        <WaitingChat />
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
                    Click here to tip with a credit card.
                  </p>
                  <p className="donate-subdescription">
                    Your card information will not be stored anywhere.
                  </p>
                </Col>
                <Col size={1} className="donate-paypal donate-box">
                  <p className="donate-description">
                    Click here to tip with Paypal.{" "}
                  </p>
                  <p className="donate-subdescription">
                    onfour will ensure your tip is sent to the artist.
                  </p>
                </Col>
                <Col size={1} className="donate-venmo donate-box">
                  <p className="donate-description">
                    Scan the QR code below to tip on Venmo.
                  </p>
                  <p className="donate-subdescription">
                    @SpencerAmer from onfour will ensure your tip is sent to the
                    artist.
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
                    Tip with Card
                  </button>{" "}
                  <Modal></Modal>
                </Col>
                <Col size={1} className="donate-paypal donate-box-button">
                  <button
                    className="stripe-button-border button-height paypal-button"
                    onClick={donatePaypal}
                  >
                    Tip with Paypal
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
            <div className="mobile-grid-stream">
              <div className="main-column">
                <div className="mobile-row stream-main-mobile">
                  <div className="stream-wrapper-mobile">
                    <VideoPlayer
                      url={
                        "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
                      }
                      start_time={show_start_time}
                      artist_name={artist_name}
                      concert_name={concert_name}
                      auth={auth}
                      user_id={user_id}
                      concert_id={concert_id}
                    />
                  </div>
                </div>
                <div className="mobile-row payment-row-mobile">
                  <button
                    className="stripe-button-border mobile-payment-button"
                    data-toggle="modal"
                    data-target="#paymentModal"
                  >
                    Tip the Artist
                  </button>{" "}
                  <Modal isOpen={false}></Modal>
                </div>
                <div className="chat-main-mobile">
                  <div className="chat-wrapper-mobile">
                    {username ? (
                      <Chat
                        chat_name={username ? username : chat_name}
                        chatStatus={chatStatus}
                      />
                    ) : (
                      <WaitingChat />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // <div className={!show_start_time ? 'parentDisable' : ''} width="100%">
        <div className="overlay-box">
          <PulseLoader
            sizeUnit={"px"}
            size={18}
            color={"#7b6dac"}
            loading={!show_start_time}
          />
        </div>
        // </div>
      )}
    </div>
  );
};

export default StreamPage;
