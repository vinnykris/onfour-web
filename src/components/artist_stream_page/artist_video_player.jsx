// React Imports
import React, { useEffect, useRef }from "react";
import ReactPlayer from "react-player";

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

  useEffect(() => {
    player = videojs(
      player_ref.current,
      { autoplay: true, muted: false, controls: true, liveui: true },
      () => {
        player.src(url);
      }
    );
    // configure plugins
    player.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,
        alwaysInLandscapeMode: true,
        iOS: true,
      },
    });
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
        <div className="player-inner-container">
          <div data-vjs-player>
            <div className="vjs-control-bar control-bar-top">
              <div className="live-indicator">
                <span className="live-indicator-text">LIVE</span>
              </div>
            </div>
            <video ref={player_ref} className="video-js" />
          </div>
          {is_live ? (
            <div className="is-live-tag">LIVE</div>
          ) : (
            <div className="is-live-tag">OFFLINE</div>
          )}
        </div>
      ) : (
        <div className="player-inner-container">
          <div data-vjs-player>
            <div className="vjs-control-bar control-bar-top">
              <div className="live-indicator">
                <span className="live-indicator-text">LIVE</span>
              </div>
            </div>
            <video ref={player_ref} className="video-js" />
          </div>
          {/* {is_live ? (
            <div className="is-live-tag">
              <i className="fa fa-circle live-circle"></i>
              LIVE
            </div>
          ) : (
            <div className="is-live-tag">OFFLINE</div>
          )} */}
        </div>
      )}
    </div>
  );
}
export default VideoPlayer;
