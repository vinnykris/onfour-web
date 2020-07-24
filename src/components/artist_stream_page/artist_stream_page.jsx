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
import VideoPlayer from "./artist_video_player";
import Chat from "../chat/stream_chat";
// import Join from "../chat/join_chat";
// import WaitingChat from "../chat/chat_waiting";
import { Grid, Row, Col } from "../grid";
import Modal from "../payment/payment_modal";
import { useWindowDimensions } from "../custom_hooks";
import VideoChat from "../video_chat/App/video_chat_App";
import CountdownTimer from "../countdown_timer/countdown_timer";

// Styles Imports
import "./artist_stream_styles.scss";

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
  const [video_col_num, setVideoColNum] = useState(2);
  const [start_time, setTimerStartTime] = useState("");
  const [start_date, setStartDate] = useState("");
  const [is_live, setIsLive] = useState(false);
  const [go_live_message, setGoLiveMsg] = useState("GO LIVE");
  // Analytics state variables
  //const [arrival, setArrival] = useState(true);

  // Get the start time for countdown_timer
  useEffect(() => {
    getStartTimeAndIsLive();
  }, []);

  // Query upcoming show database
  const getStartTimeAndIsLive = async () => {
    // Calling the API, using async and await is necessary
    await API.graphql(
      graphqlOperation(queries.get_concert_date_time_is_live, {
        id: "1b1a5c11-f590-404d-86c4-b5a7cf057069",
      })
    ).then((data) => {
      setStartTime(data.data.getConcert.time);
      setTimerStartTime(data.data.getConcert.time);
      setStartDate(data.data.getConcert.date);
      setIsLive(data.data.getConcert.is_live);
      setGoLiveMsg(data.data.getConcert.is_live ? "DISCONNECT" : "GO LIVE");
    });
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
  const [button_icon, setButtonIcon] = useState("fa fa-chevron-left");
  const toggleChat = () => {
    if (button_icon === "fa fa-chevron-left") {
      setButtonIcon("fa fa-chevron-right");
      document.getElementById("chat_container").style.display = "none";
      document.getElementById("stream_col").style.display = "none";
      setVideoColNum(6);
    } else {
      setButtonIcon("fa fa-chevron-left");
      document.getElementById("chat_container").style.display = "inline";
      document.getElementById("stream_col").style.display = "inline";
      setVideoColNum(2);
    }
  };

  const toggleGoLive = () => {
    if (is_live) {
      setIsLive(false);
      setGoLiveMsg("GO LIVE");
      const is_live_load = {
        id: "1b1a5c11-f590-404d-86c4-b5a7cf057069",
        is_live: false,
      };
      updateIsLive(is_live_load);
    } else {
      setIsLive(true);
      setGoLiveMsg("DISCONNECT");
      const is_live_load = {
        id: "1b1a5c11-f590-404d-86c4-b5a7cf057069",
        is_live: true,
      };
      updateIsLive(is_live_load);
    }
  };

  const updateIsLive = async (is_live_load) => {
    // Calling the API, using async and await is necessary
    await API.graphql(
      graphqlOperation(mutations.update_concert_is_live, {
        input: is_live_load,
      })
    );
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
                    <div className="artist-stream-wrapper" id="video_player">
                      <div className="artist-box-header">Stream Preview</div>
                      <VideoPlayer
                        url={
                          "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
                        }
                        is_live={is_live}
                      />
                      <div className="artist-timer-wrapper">
                        <CountdownTimer
                          // start_date={start_date}
                          // start_time={start_time}
                          start_date={"2020-08-01"}
                          start_time={"12:00:00"}
                          time_up_message={"You Reached Your Scheduled Time!"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="artist-control-main">
                    <div className="artist-box-header">Control</div>
                    <button
                      className="artist-go-live-button"
                      onClick={toggleGoLive}
                    >
                      {go_live_message}
                    </button>
                  </div>
                </Col>
                <Col size={2} id="chat_container">
                  <Row className="full-width">
                    <div className="artist-activity-main">
                      <div className="artist-box-header">Activity Monitor</div>
                      <h5 className="artist-show-time">
                        {viewers} watching now
                      </h5>
                    </div>
                  </Row>
                  <Row className="full-width">
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
                  </Row>
                </Col>
                <Col size={4} id="chat_container" className="sticky-container">
                  <div className="artist-video-main">
                    <div className="artist-video-wrapper">
                      <div className="artist-box-header video-chat-box-header">Video Roulette</div>
                      <VideoChat 
                        user_name={username ? username : "GUEST"} 
                        artist_name="vinnykris"
                        artistView={true} 
                        colNum={video_col_num} 
                        isReady={show_start_time}
                      ></VideoChat>
                      <div className="artist-toggle-chat">
                        <button
                          className="artist-toggle-chat-button"
                          onClick={toggleChat}
                        >
                          <i className={button_icon}></i>
                        </button>
                      </div>
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
                      is_live={is_live}
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
