// React Imports
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import MoonLoader from "react-spinners/MoonLoader";

// Styling Imports
import "./stream_styles.scss";
import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";

Amplify.configure(awsmobile);

// VideoPlayer displays countdown message when the current time is behind the start time
// of the upcoming concert. When the time is up, it will display the stream video instead
function VideoPlayer({
  url,
  start_time,
  artist_name,
  concert_name,
  auth,
  username,
  concert_id,
  is_live
}) {
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // This function calculates the time difference between current time and show start time
  // and represent the difference in days, hours, minuts and seconds
  const calculateTimeLeft = () => {
    // FOR LIVE WEBSITE: uncomment out line 38 and commment out line 43-44
    // to block the stream when the show hasn't started

    const difference = +new Date(start_time) - +new Date();

    // FOR SOUNDCHECK: comment out line 38 and uncomment out line 43-44
    // to unblock the stream

    // const difference =
    //   +new Date("2020-06-03T19:00:00.000 - 04: 00") - +new Date();

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

  // This is a React Hook function that gets called every second
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timer_components = []; // Stores the countdown message
  const timer_placeholder = []; // Placehoder to store the countdown message
  // For timer_components, the value for hours, minutes, etc is always two diigits
  // and when it's zero, it will be represented as 00.
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

  const [registered_concert, setRegisteredConcert] = useState(false);
  const registerConcert = async (concert_reg_load) => {
    // Calling the API, using async and await is necessary
    await API.graphql(
      graphqlOperation(mutations.update_registration_concert, {
        input: concert_reg_load,
      })
    );
  };

  if (!timer_placeholder.length) {
    if (auth && !registered_concert) {
      if (concert_id) {
        const concert_reg_load = {
          username: username,
          concert: concert_id,
        };
        registerConcert(concert_reg_load);
        setRegisteredConcert(true);
      }
    }
  }

  // this function asks Amplify analytics to record the streamVisit event
  const recordEvent = () => {
    Analytics.record({ name: "streamVisit" });
    console.log("event recorded for Analytics");
  };

  // Showing the user either the logged in waiting page or the
  // stream depending on the countdown

  // if (auth) {
  return (
    <div className="countdown-wrapper">
      {timer_placeholder.length ? (
        <div className="waiting-screen">
          <div className="waiting-message-container">
            <h3 className="waiting-message1">Next Stream Coming Soon</h3>
            {/* <h5 className="waiting-message2">For updates, follow us on Instagram @_onfour</h5> */}
            <h5 className="waiting-message2">
              {artist_name} - {concert_name}
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
          {is_live ? (
            <ReactPlayer
              className="video-player"
              url={url}
              width="100%"
              height="100%"
              playing
              controls
              playsinline={width <= 600}
            />
          ) : (
            <div className="waiting-for-artist-screen">
              <div className="waiting-message-container">
                <div className="not-live-loader">
                  <MoonLoader
                    sizeUnit={"px"}
                    size={30}
                    color={"white"}
                    loading={!is_live}
                  />
                </div>
                <br></br>
                <h7 className="waiting-message2">The artist is still backstage, the performance should begin soon.</h7>
                <br></br>
                <h7 className="waiting-message2">
                    If you are unable to see the stream well, please try refreshing your browser.
                </h7>
              </div>
            </div>
          )}
          {/* I try to call this function here and thought it would only be called only once when the user 
                go to the stream page AND the show is starting. However, if you look at the console logs, 
                this function gets called for infinite times. Maybe we need to figure out a better place to 
                call this function*/}
          {/* {recordEvent()}  */}
        </div>
      )}
    </div>
  );
  // } else {
  //   return (
  //     <div className="countdown-wrapper">
  //       <div className="waiting-screen">
  //         <div className="waiting-message-container">
  //           <h3 className="waiting-message1">
  //             Please sign in to view the stream
  //           </h3>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
export default VideoPlayer;
