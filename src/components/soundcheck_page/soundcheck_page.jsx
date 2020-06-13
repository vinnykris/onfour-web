// React Imports
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
// import { Prompt } from "react-router";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "../../apis/AppSync";
// Amplify Imports
import Auth from "../../apis/UserPool";

// Component Imports
import VideoPlayer from "./soundcheck_video_player";
import Chat from "../chat/stream_chat";
// import Join from "../chat/join_chat";
// import WaitingChat from "../chat/chat_waiting";
import { Grid, Row, Col } from "../grid";
// import SocialBar from "../social_bar/social_bar";
import Modal from "../payment/payment_modal";
import { useWindowDimensions } from "../custom_hooks";

// Styles Imports
import "../stream_page/stream_styles.scss";

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
  const [viewers, setViewers] = useState(0); // Sets number of live viewers on page
  // Function passed as prop to join chat
  // const joinSubmit = (name, mode) => {
  //   setChatName(name);
  //   // setShowChat(mode);
  // };
  // Function passed as prop to chat
  const chatStatus = (mode) => {
    setShowChat(mode);
  };

  // Function passed as prop to chat to get viewer numbers
  const getViewers = (num_viewers) => {
    setViewers(num_viewers);
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
    window.scrollTo({ top: "10px", behavior: "smooth" });
    setScroll(false);
  }

  // ADJUST CHAT HEIGHT BASED ON SCROLL AMOUNT
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (176 + (width / 100) * 41 - height > 0) {
        if (document.getElementById("chat_main")) {
          const scrollCheck_top =
            window.scrollY > 176 + (width / 100) * 41 - height;
          const scrollCheck_bottom = window.scrollY < 176;
          if (!scrollCheck_top) {
            // if the scroll is not larger than threshold to increase height
            document.getElementById("chat_main").style.height =
              (width / 100) * 41 + "px";
          } else if (scrollCheck_bottom) {
            // is scroll is larger than lower threshold but less than higher threshold
            document.getElementById("chat_main").style.height =
              window.scrollY - 176 + height + "px";
          } else {
            document.getElementById("chat_main").style.height = height + "px";
          }
        }
      } else {
        if (document.getElementById("chat_main")) {
          const scrollCheck_top = window.scrollY === 0;
          const scrollCheck_bottom = window.scrollY < 176;
          if (scrollCheck_top) {
            document.getElementById("chat_main").style.height =
              (width / 100) * 41 + "px";
          } else if (scrollCheck_bottom) {
            document.getElementById("chat_main").style.height =
              (width / 100) * 41 + window.scrollY + "px";
          } else {
            document.getElementById("chat_main").style.height = height + "px";
          }
        }
      }
    });
  });

  // POP_UP WARNING SECTION
  // const [show_alert, setShowAlert] = useState(true); // If pre-show alert should be shown
  // // Hides popup if closed
  // const hidePopup = () => {
  //   setShowAlert(false);
  // };

  // GETTING INFORMATION ABOUT MOST RECENT UPCOMING SHOW
  const [show_start_time, setStartTime] = useState(""); // Stores the upcoming show's start time
  const [show_time, setShowTime] = useState(""); // Store the upcoming show's start time to display
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

    const hour = parseInt(info_list[0].time.slice(0, 2));
    const minutes = info_list[0].time.slice(2, 5);

    setStartTime(info_list[0].date + "T" + info_list[0].time + ".000-04:00");
    setShowTime(
      info_list[0].date +
        " " +
        (hour > 12
          ? (hour - 12).toString() + minutes + "PM"
          : hour < 12
          ? info_list[0].time.slice(0, 5) + "AM"
          : info_list[0].time.slice(0, 5) + "PM")
    );
    setConcertName(info_list[0].concertName);
    setArtistName(info_list[0].artist);
    setConcertID(info_list[0].concertId);
  };

  // GET USER'S REGISTRATION INFORMATION
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [username, setUsername] = useState(""); // Username from login

  // If the user is logged in/valid, set their auth value to true and track their email
  // If the user is not logged in/invalid, reset their auth value to false
  Auth.currentAuthenticatedUser({})
    .then((user) => {
      setUsername(user.username);
      setShowChat(true);
      setAuth(true);
    })
    .catch((err) => setAuth(false));

  // DONATION SECTION
  // Opens link to paypal account for musician
  const donatePaypal = () => {
    const url = "https://bit.ly/3dN8gOB";
    window.open(url, "_blank");
  };

  // TOGGLE CHAT SECTION
  const [button_icon, setButtonIcon] = useState("fa fa-chevron-right");
  const toggleChat = () => {
    if (button_icon === "fa fa-chevron-right") {
      setButtonIcon("fa fa-chevron-left");
      document.getElementById("chat_container").style.display = "none";
      // document.getElementById("chat_container").style.display = "none";
      document.getElementById("stream_col").style.flex = "9";
    } else {
      setButtonIcon("fa fa-chevron-right");
      document.getElementById("chat_container").style.display = "inline";
      document.getElementById("stream_col").style.flex = "7";
    }
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
                {/* <Col size={0.5}></Col> */}
                <Col size={7} id="stream_col">
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
                        username={username}
                        concert_id={concert_id}
                      />
                      <div className="toggle-chat">
                        <button
                          className="toggle-chat-button"
                          onClick={toggleChat}
                        >
                          <i class={button_icon}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <Row className="stream-info-row">
                    {/* <Col size={0.1}></Col> */}
                    <Col size={7}>
                      <Row>
                        <Col size={2}>
                          <h3 className="artist-name-stream">{artist_name}</h3>
                        </Col>
                        <Col size={1}>
                          <div className="viewers">
                            <h5 className="viewer-count show-time">
                              {viewers} watching now
                            </h5>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <h5 className="show-time">
                          {show_time} (refresh the page if stream doesn't show
                          up)
                        </h5>
                      </Row>
                      {/* </Col> */}
                      {/* <Col size={1} className="social-bar-center">
                           <SocialBar />
                      </Col> */}
                    </Col>
                    {/* <Col size={2.5}></Col>
                    <Col size={0.5}></Col> */}
                  </Row>
                  <Row>
                    <div className="short-term-spacer"></div>
                  </Row>

                  {/* DONATE ROW */}
                  <Row className="donate-row">
                    <Col size={1} className="donate-stripe donate-box">
                      <p className="donate-description">Credit Card</p>
                      <p className="donate-subdescription">
                        Donate via credit card to For the GWORLS
                        and LGBT Freedom Fund. Your card information will not be stored anywhere.
                      </p>
                    </Col>
                    <Col size={1} className="donate-paypal donate-box">
                      <p className="donate-description">PayPal</p>
                      <p className="donate-subdescription">
                        onfour will ensure your donation is sent to For the GWORLS
                        and LGBT Freedom Fund.
                      </p>
                    </Col>
                    <Col size={1} className="donate-venmo donate-box">
                      <p className="donate-description">Venmo</p>
                      <p className="donate-subdescription">
                        @SpencerAmer from onfour will ensure your donation is sent to
                        For the GWORLS and LGBT Freedom Fund.
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
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
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
                </Col>
                <Col
                  size={2.5}
                  id="chat_container"
                  className="sticky-container"
                >
                  <div className="chat-main" id="chat_main">
                    <div className="chat-wrapper">
                      {/* {
                      username ? (
                        <Chat
                          chat_name={username ? username : null}
                          chatStatus={chatStatus}
                        />
                      ) : (
                        // <Join joinSubmit={joinSubmit} />
                        <WaitingChat />
                      )
                      } */}
                      {/* {console.log(username)} */}
                      <Chat
                        chat_name={username ? username : "GUEST"}
                        chatStatus={chatStatus}
                        setViewers={getViewers}
                      />
                    </div>
                  </div>
                </Col>
                {/* <Col size={0.5}></Col> */}
              </Row>
              {/* BELOW IS THE CODE FOR THE ARTIST INFORMATION*/}
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
                      username={username}
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
                    <Chat
                      chat_name={username ? username : "GUEST"}
                      chatStatus={chatStatus}
                      setViewers={getViewers}
                    />
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