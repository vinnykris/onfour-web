// React Imports
import React, { useEffect, useRef } from "react";

// Styling Imports
import "./artist_stream_styles.scss";
import { useWindowDimensions } from "../custom_hooks";

// VideoJS Imports
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./artist_video_js_styles.scss";
import "videojs-landscape-fullscreen";

// AWS Imports
import Amplify from "aws-amplify";
import awsmobile from "../../apis/AppSync";

Amplify.configure(awsmobile);

// VideoPlayer displays countdown message when the current time is behind the start time
// of the upcoming concert. When the time is up, it will display the stream video instead
function VideoPlayer({ url, is_live }) {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  var player = null;
  const player_ref = useRef();
  const div_el = useRef(null);
  const video_el = useRef(null);

  // useEffect(() => {
  //   player = videojs(
  //     player_ref.current,
  //     { autoplay: true, muted: false, controls: true, liveui: true },
  //     () => {
  //       player.src(url);
  //     }
  //   );
  //   // configure plugins
  //   player.landscapeFullscreen({
  //     fullscreen: {
  //       enterOnRotate: true,
  //       alwaysInLandscapeMode: true,
  //       iOS: true,
  //     },
  //   });
  // }, []);
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
        // player.load(
        //   "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8"
        // );
        player.load(
          "https://54db060f9b79.us-east-1.playback.live-video.net/api/video/v1/us-east-1.556351844479.channel.0WDRvKHIFymu.m3u8"
        );
        player.play();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (player) player.dispose();
    };
  }, []);
  // Showing the stream
  return (
    <div className="artist-player-wrapper">
      {width <= 600 ? (
        <div className="player-inner-container" ref={div_el}>
          {/* <div data-vjs-player>
            <div className="vjs-control-bar control-bar-top">
              <div className="live-indicator">
                <span className="live-indicator-text">LIVE</span>
              </div>
            </div>
            <video ref={player_ref} className="video-js" />
          </div> */}
          <video
            id="video-player"
            ref={video_el}
            playsInline
            autoPlay
            controls
            className="ivs-video"
          />
          {is_live ? (
            <div className="is-live-tag">LIVE</div>
          ) : (
            <div className="is-live-tag">OFFLINE</div>
          )}
        </div>
      ) : (
        <div className="player-inner-container">
          {/* <div data-vjs-player>
            <div className="vjs-control-bar control-bar-top">
              <div className="live-indicator">
                <span className="live-indicator-text">LIVE</span>
              </div>
            </div>
            <video ref={player_ref} className="video-js" />
          </div> */}
          {/* {is_live ? (
            <div className="is-live-tag">
              <i className="fa fa-circle live-circle"></i>
              LIVE
            </div>
          ) : (
            <div className="is-live-tag">OFFLINE</div>
          )} */}
          <video
            id="video-player"
            ref={video_el}
            playsInline
            autoPlay
            controls
            className="ivs-video"
          />
        </div>
      )}
    </div>
  );
}
export default VideoPlayer;
