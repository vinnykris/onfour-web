import React, { useEffect, useState, useCallback } from "react";
//Component imports
import { useInputValue } from "../../custom_hooks";
import Call from "../Call/Call";
import StartButton from "../StartButton/StartButton";
import api from "../artist_api";
import "./App.scss";
import Tray from "../Tray/Tray";
import CallObjectContext from "../CallObjectContext";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../urlUtils";
import DailyIframe from "@daily-co/daily-js";
import { logDailyEvent } from "../logUtils";
import getToken from "../getToken";

const STATE_IDLE = "STATE_IDLE";
const STATE_CREATING = "STATE_CREATING";
const STATE_JOINING = "STATE_JOINING";
const STATE_JOINED = "STATE_JOINED";
const STATE_LEAVING = "STATE_LEAVING";
const STATE_ERROR = "STATE_ERROR";

export default function VideoChatApp({
  user_name,
  artist_name,
  artistView,
  colNum,
  stream_vol_adjust,
  video_chat_variables,
}) {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [mute_all, setMuteAll] = useState(true);
  const [mute_button_msg, setMuteButtonMsg] = useState("UNMUTE ALL");
  const [volume, setVolume] = useState(1);
  const [error_msg, setErrorMsg] = useState("");
  const [start_auto_roulette, setStartAutoRoulette] = useState(false);

  /**
   * Creates a new call room.
   */
  const createPublicCall = useCallback(async () => {
    setAppState(STATE_CREATING);
    let response = await api.createRoom();
    if (response.url) {
      return response.url;
    } else if (response.error) {
      setErrorMsg(response.info);
      setRoomUrl(null);
      setAppState(STATE_IDLE);
      throw "error creating room";
    }
  }, []);

  /**
   * Starts joining an existing call.
   *
   * NOTE: In this demo we show how to completely clean up a call with destroy(),
   * which requires creating a new call object before you can join() again.
   * This isn't strictly necessary, but is good practice when you know you'll
   * be done with the call object for a while and you're no longer listening to its
   * events.
   */
  const startJoiningPublicCall = useCallback(async (url) => {
    // const newToken = await getToken(user_name, url.split("/").pop());
    const newCallObject = DailyIframe.createCallObject({
      userName: user_name,
    });
    setRoomUrl(url.split("/").pop());
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url });
  }, []);

  /**
   * Starts leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    setAppState(STATE_LEAVING);
    callObject.leave();
  }, [callObject]);

  const completelyLeaveVideoChat = useCallback(async () => {
    if (!callObject) {
      return;
    }
    setAppState(STATE_LEAVING);
    await callObject.leave();
    callObject.destroy().then(() => {
      setRoomUrl(null);
      setCallObject(null);
      setAppState(STATE_IDLE);
    });
  }, [callObject]);
  /**
   * If a room's already specified in the page's URL when the component mounts,
   * join the room.
   */
  useEffect(() => {
    const url = roomUrlFromPageUrl();
    if (url) {
      url && startJoiningPublicCall("https://onfour.daily.co/" + url);
    }
  }, [startJoiningPublicCall]);

  /**
   * Update the page's URL to reflect the active call when roomUrl changes.
   *
   * This demo uses replaceState rather than pushState in order to avoid a bit
   * of state-management complexity. See the comments around enableCallButtons
   * and enableStartButton for more information.
   */
  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  /**
   * Update app state based on reported meeting state changes.
   *
   * NOTE: Here we're showing how to completely clean up a call with destroy().
   * This isn't strictly necessary between join()s, but is good practice when
   * you know you'll be done with the call object for a while and you're no
   * longer listening to its events.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
      event && logDailyEvent(event);
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE_JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case "error":
          setAppState(STATE_ERROR);
          setTimeout(function () {
            callObject.destroy().then(() => {
              setRoomUrl(null);
              setCallObject(null);
              setAppState(STATE_IDLE);
            });
          }, 3000);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  /**
   * Show the call UI if we're either joining, already joined, or are showing
   * an error.
   */
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(
    appState
  );

  /**
   * Only enable the call buttons (camera toggle, leave call, etc.) if we're joined
   * or if we've errored out.
   *
   * !!!
   * IMPORTANT: calling callObject.destroy() *before* we get the "joined-meeting"
   * can result in unexpected behavior. Disabling the leave call button
   * until then avoids this scenario.
   * !!!
   */
  const enableCallButtons = [STATE_JOINED].includes(appState);
  // const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(appState);

  /**
   * Only enable the start button if we're in an idle state (i.e. not creating,
   * joining, etc.).
   *
   * !!!
   * IMPORTANT: only one call object is meant to be used at a time. Creating a
   * new call object with DailyIframe.createCallObject() *before* your previous
   * callObject.destroy() completely finishes can result in unexpected behavior.
   * Disabling the start button until then avoids that scenario.
   * !!!
   */
  const enableStartButton = appState === STATE_IDLE;

  const toggle_mute_unmute_all = () => {
    if (mute_all) {
      setMuteAll(false);
      setMuteButtonMsg("MUTE ALL");
    } else {
      setMuteAll(true);
      setMuteButtonMsg("UNMUTE ALL");
    }
  };

  const room_max_map = {
    room1: 4,
    room2: 6,
    room3: 10,
  };

  const activateVideoRoulette = () => {
    if (start_auto_roulette) {
      setStartAutoRoulette(false);
      // document.getElementById("roulette-button").style.background = "transparent";
      // document.getElementById("roulette-button").style.color = "#E465A2";
    } else {
      setStartAutoRoulette(true);
      // document.getElementById("roulette-button").style.background = "#E465A2";
      // document.getElementById("roulette-button").style.color = "rgba(255, 255, 255, 0.87)";
    }
  };

  useEffect(() => {
    if (start_auto_roulette) {
      if (appState === STATE_IDLE) {
        setTimeout(() => {
          createPublicCall().then((url) => startJoiningPublicCall(url));
        }, 1000);
      } else if (appState === STATE_JOINED) {
        setTimeout(() => {
          startLeavingCall();
        }, 8000);
      }
    }
  });

  return (
    <div className={(artistView ? "artist-" : "") + "app"} id="video-chat-main">
      <div className="room-name-row">
        <div className="artist-box-header video-chat-box-header header-7">
          Video Chat
        </div>
        <label class="auto-roulette-switch">
          <input type="checkbox" onChange={activateVideoRoulette} />
          <span class="auto-roulette-slider round"></span>
        </label>
        <div className="auto-roulette-text header-8">auto-rotate rooms</div>
        {/* <button
          className="auto-roulette-button"
          id="roulette-button"
          onClick={activateVideoRoulette}
        >
          {start_auto_roulette ? "End Auto-Roulette" : "Start Auto-Roulette"}
        </button> */}
      </div>
      {showCall ? (
        // NOTE: for an app this size, it's not obvious that using a Context
        // is the best choice. But for larger apps with deeply-nested components
        // that want to access call object state and bind event listeners to the
        // call object, this can be a helpful pattern.
        <CallObjectContext.Provider value={callObject}>
          <button
            id="leave-call-button"
            className="transparent-completely-leave-video-chat-button"
            onClick={completelyLeaveVideoChat}
          >
            leave
          </button>
          <Call
            roomUrl={roomUrl}
            artist_name={artist_name}
            isPublic={isPublic}
            artistView={artistView}
            colNum={colNum}
            mute_all={mute_all}
            volume={volume}
            video_chat_variables={video_chat_variables}
          />
          <Tray
            disabled={!enableCallButtons}
            onClickLeaveCall={startLeavingCall}
            artistView={artistView}
            mute_function={toggle_mute_unmute_all}
            button_message={mute_button_msg}
            volume={volume}
            adjust_volume={setVolume}
            stream_vol_adjust={stream_vol_adjust}
          />
        </CallObjectContext.Provider>
      ) : (
        <div className="video-chat-prompt-container">
          {start_auto_roulette ? (
            <div className="enter-video-chat-prompt">
              <div className="public-video-notice message-text">
                auto-rotating rooms....
              </div>
            </div>
          ) : (
            <div className="enter-video-chat-prompt">
              <StartButton
                create_room={false}
                disabled={!enableStartButton}
                onClick={() => {
                  createPublicCall().then((url) => startJoiningPublicCall(url));
                }}
                artistView={artistView}
              />
              <p className="create-room-error">{error_msg}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
