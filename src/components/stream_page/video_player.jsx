// React Imports
import React, { useEffect, useState, useRef } from "react";

// External imports
import ReactPlayer from "react-player";
import MoonLoader from "react-spinners/MoonLoader";

// VideoJS Imports
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./video_js_styles.scss";
import "videojs-landscape-fullscreen";

// Custom Component Imports
import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import {
  PlayerError,
  PlayerState,
  PlayerEventType,
  registerIVSTech,
} from "amazon-ivs-player";

// Styling Imports
import "./stream_styles.scss";

Amplify.configure(awsmobile);

// VideoPlayer displays countdown message when the current time is behind the start time
// of the upcoming concert. When the time is up, it will display the stream video instead
function VideoPlayer({
  url,
  start_time,
  artist_name,
  artist_img,
  concert_name,
  auth,
  username,
  concert_id,
  is_live,
  stream_volume,
  have_upcoming_concert,
}) {
  const [is_artist_backstage, setIsArtistBackstage] = useState(true); // Determines whether to show the indicator that the artist is backstage
  const [current_stream_state, setCurrentStreamState] = useState(""); // Holds the current state of the stream
  const is_first_render = useRef(true);

  const { height, width } = useWindowDimensions(); // Dimensions of screen
  var player = null;
  const div_el = useRef(null);
  const video_el = useRef(null);

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
    if (have_upcoming_concert) {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
  });

  const timer_components = []; // Stores the countdown message
  const timer_placeholder = []; // Placehoder to store the countdown message
  // For timer_components, the value for hours, minutes, etc is always two diigits
  // and when it's zero, it will be represented as 00.
  // However, for timer_placeholder, if one element counts towards zero, the length of that element value
  // will be zero unlike timer_components

  // This function loops through date, hours, minutes and seconds in
  // timeLeft and combine those together to render in React
  if (have_upcoming_concert) {
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
  }

  // THIS SHOULD ALSO ADD THE CONCERT TO THE USER IN THE DATABASE

  // const [registered_concert, setRegisteredConcert] = useState(false);
  // const registerConcert = async (concert_reg_load) => {
  //   console.log(concert_reg_load.concert);
  //   // Calling the API, using async and await is necessary
  //   await API.graphql(
  //     graphqlOperation(mutations.update_registration_concert, {
  //       input: concert_reg_load,
  //     })
  //   );
  // };

  // if (!timer_placeholder.length) {
  //   if (auth && !registered_concert) {
  //     if (concert_id) {
  //       const concert_reg_load = {
  //         username: username,
  //         concert: concert_id,
  //       };
  //       registerConcert(concert_reg_load);
  //       setRegisteredConcert(true);
  //     }
  //   }
  // }

  // this function asks Amplify analytics to record the streamVisit event
  const recordEvent = () => {
    Analytics.record({ name: "streamVisit" });
    // console.log("event recorded for Analytics");
  };

  const [global_player, setGlobalPlayer] = useState();

  // On mount, the IVS script is loaded.
  useEffect(() => {
    // IVS WORKAROUND SOURCE: https://github.com/cm-wada-yusuke/amazon-ivs-react-js-sample/blob/master/src/AmazonIVSWorkaround.js
    const script = document.createElement("script");

    script.src = "https://player.live-video.net/1.0.0/amazon-ivs-player.min.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      // eslint-disable-next-line no-undef
      if (IVSPlayer.isPlayerSupported) {
        // eslint-disable-next-line no-undef
        const player = IVSPlayer.create();
        player.attachHTMLVideoElement(document.getElementById("video-player"));
        setGlobalPlayer(player);
        is_first_render.current = false;
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // This is called after the IVS player is loaded. If the show has started already, then get the stream.
  // If the countdown is still going, do not load the stream.
  // This protects against people inspecting and hiding the stream waiting page.
  useEffect(() => {
    if (!is_first_render.current) {
      if (!timer_placeholder.length) getStream();
    }
  }, [global_player]);

  // This function is called every time the timer placeholder length changes.
  // The length refers to how many non-zero values there are in the countdown timer.
  // If days, hours, minutes, and seconds are all at 0, that means the countdown is over.
  // Length of the timer placeholder will be 0 here, and the stream is then loaded.
  useEffect(() => {
    if (!timer_placeholder.length && !is_first_render.current) {
      getStream();
    }
  }, [timer_placeholder.length]);

  const getStream = () => {
    // Try to load stream. This will either successfully load the stream or start an infinite loading cycle.
    global_player.load(
      "https://54db060f9b79.us-east-1.playback.live-video.net/api/video/v1/us-east-1.556351844479.channel.0WDRvKHIFymu.m3u8"
    );

    // For loop that runs through all of the Player States, and adds event listeners for each
    for (let state of Object.values(PlayerState)) {
      global_player.addEventListener(state, () => {
        // If player receives "Ended" event, call the endStream function.
        // If the player receives "Idle" event, attempt to reload the stream; this will restart the loading cycle.
        setCurrentStreamState(state);
        // console.log(state); // Uncomment this line out if testing -- will give you info about what state the stream is in.
        if (state === "Ended" || state === "Idle") {
          if (state === "Ended") endStream();
          if (state === "Idle")
            global_player.load(
              "https://54db060f9b79.us-east-1.playback.live-video.net/api/video/v1/us-east-1.556351844479.channel.0WDRvKHIFymu.m3u8"
            );
          setIsArtistBackstage(true);
          return;
        }

        // If code reaches this point, that means that the stream was successfully loaded. Play the stream, don't need to load.
        global_player.play();
        setIsArtistBackstage(false);
      });
    }

    // Listens for any error events. Errors occur when player attempts to load stream and there is no stream.
    // If player finds error, player attempts to load again, thus creating an infinite load cycle that only
    // ends once the stream is successfully loaded.
    global_player.addEventListener(PlayerEventType.ERROR, (error) => {
      setCurrentStreamState("Error");
      // console.error("ERROR", error); // This outputs the error to the console -- uncomment if testing
      global_player.load(
        "https://54db060f9b79.us-east-1.playback.live-video.net/api/video/v1/us-east-1.556351844479.channel.0WDRvKHIFymu.m3u8"
      );
      setIsArtistBackstage(true);
    });
  };

  // Called when the stream ends. Tries to load stream again after 8 second pause.
  // The reason we try to restart the stream again is the start the infinite cycle again.
  // This way, if someone stops streaming and then starts again, the users don't have to refresh.
  const endStream = () => {
    setTimeout(getStream, 8000);
  };

  useEffect(() => {
    if (stream_volume) {
      if (global_player) {
        global_player.setVolume(stream_volume);
        console.log(stream_volume);
        console.log(global_player.getVolume());
      }
    }
  }, [stream_volume]);

  return (
    <div className="countdown-wrapper">
      {timer_placeholder.length ? (
        <div className="waiting-screen">
          {width <= 600 ? (
            <div className="waiting-message-container">
              <h3 className="header-4">Next Stream Coming Soon</h3>
              <h5 className="waiting-message2 header-7">
                Invite your friends to join you while waiting!
              </h5>
              <h5 className="header-7">UP NEXT: {artist_name}</h5>
            </div>
          ) : (
            <div className="waiting-message-container">
              <h3 className="header-3">Next Stream Coming Soon</h3>
              <h5 className="waiting-message2 header-5">
                Invite your friends to join you while waiting!
              </h5>
              <h5 className="header-5">UP NEXT: {artist_name}</h5>
            </div>
          )}
          <div className="countdown-component-wrapper">
            <Grid>
              <Row>{timer_components}</Row>
            </Grid>
          </div>
        </div>
      ) : null}
      {have_upcoming_concert ? (
        <div className="player-wrapper" ref={div_el}>
          {is_artist_backstage ? (
            <div className="waiting-for-artist-screen">
              <img src={artist_img} className="artist-img-background"></img>
              <div className="waiting-message-container">
                <div className="not-live-loader">
                  <MoonLoader
                    sizeUnit={"px"}
                    size={30}
                    color={"white"}
                    loading={is_artist_backstage}
                  />
                </div>
                <br></br>
                <span className="waiting-message2 header-5">
                  {artist_name} is backstage.
                </span>
              </div>
            </div>
          ) : null}
          <video
            id="video-player"
            ref={video_el}
            playsInline
            autoPlay
            controls
            muted={false}
            className="ivs-video"
          />
        </div>
      ) : (
        <div className="waiting-screen">
          {width <= 600 ? (
            <div className="waiting-message-container">
              <h3 className="header-6 mobile-no-show-waiting-msg">
                {"No scheduled shows at the moment,\nbut stay tuned!"}
              </h3>
              <h5 className="header-8">
                For updates, follow us on Instagram @_onfour
              </h5>
            </div>
          ) : (
            <div className="waiting-message-container">
              <h3 className="header-4 no-show-waiting-msg">
                {"No scheduled shows at the moment, but stay tuned!"}
              </h3>
              <h5 className="header-6">
                For updates, follow us on Instagram @_onfour
              </h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default VideoPlayer;
