// React Imports
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

// Styling Imports
import "./stream_styles.scss";
import { Grid, Row, Col } from "../grid";

// Image Imports
import WaitingScreen from "../../images/backgrounds/stream_waiting_img.png";

// Amplify Imports
import Auth from "../../apis/UserPool";

// VideoPlayer displays countdown message when the current time is behind the start time
// of the upcoming concert. When the time is up, it will display the stream video instead
function VideoPlayer(props) {
  // Later, this value should be extracted from the database
  const [show_start_time, setStartTime] = useState(
    "2020-05-24T20:25:00.000-04:00"
  ); // Stores the start time of upcoming concert
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session

  // If user is authenticated, set auth to true, otherwise set it to false
  Auth.currentAuthenticatedUser({})
    .then((user) => setAuth(true))
    .catch((err) => setAuth(false));

  // This function calculates the time difference between current time and show start time
  // and represent the difference in days, hours, minuts and seconds
  const calculateTimeLeft = () => {
    const difference = +new Date(show_start_time) - +new Date();
    let time_left = {};

    if (difference > 0) {
      time_left = {
        DAYS: Math.floor(difference / (1000 * 60 * 60 * 24)),
        HOURS: Math.floor((difference / (1000 * 60 * 60)) % 24),
        MINUTES: Math.floor((difference / 1000 / 60) % 60),
        SECONDS: Math.floor((difference / 1000) % 60),
      };
    }

    return time_left;
  };

  const [time_left, setTimeLeft] = useState(calculateTimeLeft()); // Stores the time difference

  // This is a React Hook function that gets called every 1 second
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timer_components = []; // Stores the countdown message
  const timer_placeholder = []; // Placehoder to store the countdown message
  // However, for timer_placeholder, if one element counts towards zero, the length of that element value
  // will be zero unlike timer_components

  // This function loops through date, hours, minutes and seconds in
  // timeLeft and combine those together to render in React
  Object.keys(time_left).forEach((interval) => {
    if (!time_left[interval]) {
      // return;
      timer_components.push(
        <Col size={1} className="timer-block">
          <Row>
            <span className="timer-number">00</span>
          </Row>
          <Row>
            <span className="timer-label">{interval} </span>
          </Row>
        </Col>
      );
    } else {
      if (time_left[interval] > 9) {
        timer_components.push(
          <Col size={1} className="timer-block">
            <Row>
              <span className="timer-number">{time_left[interval]}</span>
            </Row>
            <Row>
              <span className="timer-label">{interval} </span>
            </Row>
          </Col>
        );
      } else {
        timer_components.push(
          <Col size={1} className="timer-block">
            <Row>
              <span className="timer-number">0{time_left[interval]}</span>
            </Row>
            <Row>
              <span className="timer-label">{interval} </span>
            </Row>
          </Col>
        );
      }
      timer_placeholder.push(
        <Col size={1} className="timer-block">
          <Row>
            <span className="timer-number">{time_left[interval]}</span>
          </Row>
          <Row>
            <span className="timer-label">{interval} </span>
          </Row>
        </Col>
      );
    }
  });

  // If the user is logged in, show them either the logged in waiting page or the
  // stream depending on the countdown
  // If the user is not logged in, show them the alternate waiting page
  if (auth) {
    return (
      <div className="countdown-wrapper">
        {timer_placeholder.length ? (
          <div className="waiting-screen">
            <div className="waiting-message-container">
              <h3 className="waiting-message1">Next Stream Coming Soon</h3>
              <h5 className="waiting-message2">
                For updates, follow us on Instagram @_onfour
              </h5>
            </div>
            <div className="countdown-component-wrapper">
              <Grid>
                <Row>{timer_components}</Row>
              </Grid>
            </div>
          </div>
        ) : (
          <div className="player-wrapper">
            <ReactPlayer
              className="video-player"
              url={props.url}
              width="100%"
              height="100%"
              playing
              controls
            />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="countdown-wrapper">
        <div className="waiting-screen">
          <div className="waiting-message-container">
            <h3 className="waiting-message1">Next Stream Coming Soon</h3>
            <h5 className="waiting-message2">
              Please sign in to view the stream!
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
export default VideoPlayer;
