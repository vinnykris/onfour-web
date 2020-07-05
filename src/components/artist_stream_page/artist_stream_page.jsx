// React Imports
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import { Prompt } from "react-router";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
// Amplify Imports
import Auth from "../../apis/UserPool";

// Component Imports
import VideoPlayer from "./artist_video_player";
import Chat from "../chat/stream_chat";
// import Join from "../chat/join_chat";
// import WaitingChat from "../chat/chat_waiting";
import { Grid, Row, Col } from "../grid";
import SocialBar from "../social_bar/social_bar";
import Modal from "../payment/payment_modal";
import { useWindowDimensions } from "../custom_hooks";
import VideoChat from "../video_chat/App/video_chat_App";

// Styles Imports
import "./artist_stream_styles.scss";

// Image imports
import VenmoCode from "../../images/venmo_codes/onfour_venmo.jpeg";

Amplify.configure(awsmobile);

// Main stream page component. Holds stream video, chat, and payment functionality
const StreamPage = () => {
  // DETERMINE MOBILE VERSION OR NOT
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // DONATION SECTION
  const tip_based = true; // DEFINES WHETHER SHOW IS TIP OR DONATION BASED

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

    Analytics.record({ name: "emailSubscribeClicked" });

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
    window.scrollTo({ top: "176px", behavior: "smooth" });
    setScroll(false);
  }


  // GETTING INFORMATION ABOUT MOST RECENT UPCOMING SHOW
  const [show_start_time, setStartTime] = useState(""); // Stores the upcoming show's start time
  const [show_time, setShowTime] = useState(""); // Store the upcoming show's start time to display
  const [artist_name, setArtistName] = useState(""); // Stores the upcoming show's artist name
  const [concert_name, setConcertName] = useState(""); // Stores the upcoming show's concert name
  const [concert_id, setConcertID] = useState("");

  // Analytics state variables
  //const [arrival, setArrival] = useState(true);

  // Get the start time for countdown_timer
  // Call stream page analtics
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


  // TOGGLE CHAT SECTION
  const [button_icon, setButtonIcon] = useState("fa fa-chevron-right");
  const toggleChat = () => {
    if (button_icon === "fa fa-chevron-right") {
      setButtonIcon("fa fa-chevron-left");
      document.getElementById("chat_container").style.display = "none";
      // document.getElementById("chat_container").style.display = "none";
      document.getElementById("stream_col").style.flex = "4";
    } else {
      setButtonIcon("fa fa-chevron-right");
      document.getElementById("chat_container").style.display = "inline";
      document.getElementById("stream_col").style.flex = "2";
    }
  };


  // RENDERING SECTION
  return (
    <div className="stream-container">
      {show_start_time ? (
        <div className="stream-page-content">
          {width > 600 ? (
            <Grid>
              <Row>
                {/* <Col size={0.5}></Col> */}
                <Col size={2} id="stream_col">
                  <div className="artist-stream-main">
                    <div className="stream-wrapper" id="video_player">
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
                  <div className="artist-info-main">
                    <div className="artist-viewers">
                      <h5 className="viewer-count show-time">
                        {viewers} watching now
                      </h5>
                    </div>
                  </div>
                </Col>
                <Col
                  size={2}
                  id="chat_container"
                  className="sticky-container"
                >
                  <div className="artist-chat-main" id="chat_main">
                    <div className="artist-chat-wrapper">
                      <Chat
                        chat_name={username ? username : "GUEST"}
                        chatStatus={chatStatus}
                        setViewers={getViewers}
                        artistView={true}
                      />
                    </div>
                  </div>
                </Col>
                <Col
                  size={4}
                  id="chat_container"
                  className="sticky-container"
                >
                  <div className="artist-chat-main">
                    <div className="artist-chat-wrapper">
                      {/* <Chat
                        chat_name={username ? username : "GUEST"}
                        chatStatus={chatStatus}
                        setViewers={getViewers}
                        artistView={true}
                      /> */}
                      <VideoChat user_name={username ? username : "GUEST"} artistView={true}></VideoChat>
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
                  {tip_based ? (
                    <button
                      className="stripe-button-border mobile-payment-button"
                      data-toggle="modal"
                      data-target="#paymentModal"
                    >
                      Tip {artist_name}
                    </button>
                  ) : (
                    <button
                      className="stripe-button-border mobile-payment-button"
                      data-toggle="modal"
                      data-target="#paymentModal"
                    >
                      Donate
                    </button>
                  )}
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
