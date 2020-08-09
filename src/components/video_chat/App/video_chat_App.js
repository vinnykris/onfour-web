import React, { useEffect, useState, useCallback } from "react";
import Call from "../Call/Call";
import StartButton from "../StartButton/StartButton";
import api from "../api";
import "./App.css";
import Tray from "../Tray/Tray";
import CallObjectContext from "../CallObjectContext";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../urlUtils";
import DailyIframe from "@daily-co/daily-js";
import { logDailyEvent } from "../logUtils";
import getToken from "../getToken";
import {Grid, Row, Col} from "../../grid";
import { useInputValue } from "../../custom_hooks";

const STATE_IDLE = "STATE_IDLE";
const STATE_CREATING = "STATE_CREATING";
const STATE_JOINING = "STATE_JOINING";
const STATE_JOINED = "STATE_JOINED";
const STATE_LEAVING = "STATE_LEAVING";
const STATE_ERROR = "STATE_ERROR";
const owner_name = ["takoyuxin", "onfour-yuxin", "onfour-spencer", "spencer", "onfour-vinod", "vinnykris", "alilyen", "onfour-bar","barkadosh"];
const crew_name = "onfour Crew"

export default function VideoChatApp({ user_name, artist_name, artistView, colNum}) {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [mute_all, setMuteAll] = useState(true);
  const [mute_button_msg, setMuteButtonMsg] = useState("UNMUTE ALL");
  const isInCrew = (owner_name.indexOf(user_name) >= 0);
  // Input form values
  const layer1_bps = useInputValue('');
  const layer2_bps = useInputValue('');
  const resolution_width = useInputValue('');
  const resolution_height = useInputValue('');
  const frame_rate = useInputValue('');
  /**
   * Creates a new call room.
   */
  const createPublicCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return api
      .createRoom(true)
      .then(room => room.url)
      .catch(error => {
        console.log("Error creating room", error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
  }, []);

  const createPrivateCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return api
      .createRoom(false)
      .then(room => room.url)
      .catch(error => {
        console.log("Error creating room", error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
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
  const startJoiningPublicCall = useCallback((url,layer1_bps, layer2_bps, frame_rate, resolution_width, resolution_height) => {
    console.log(layer1_bps.value, layer2_bps.value, resolution_width.value, resolution_height.value, frame_rate.value);
    const newCallObject = DailyIframe.createCallObject({
      userName: user_name,
      dailyConfig: {
        camSimulcastEncodings: [
          { maxBitrate: layer1_bps.value, scaleResolutionDownBy: 2 },
          { maxBitrate: layer2_bps.value, scaleResolutionDownBy: 1 },
        ],
      },
    });
    // setRoomUrl(url);
    setRoomUrl("public");
    newCallObject.setBandwidth({
      // kbs: 20,
      trackConstraints: { width: resolution_width.value, height: resolution_height.value, frameRate: frame_rate.value }
    });
    newCallObject.join({ url });
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
  }, []);

  const startJoiningPrivateCall = useCallback(async url => {
    if (owner_name.indexOf(user_name) >=0 ) {
      const newToken = await getToken(user_name);
      console.log(newToken);
      const newCallObject = DailyIframe.createCallObject({
        userName: user_name,
        token: newToken,
      });
      // setRoomUrl(url);
      setRoomUrl("private");
      newCallObject.join({ url });
      setCallObject(newCallObject);
      setAppState(STATE_JOINING);
    } 
    // else {
    //   const newCallObject = DailyIframe.createCallObject({
    //     userName: user_name
    //   });
    //   // setRoomUrl(url);
    //   setRoomUrl("private");
    //   setCallObject(newCallObject);
    //   setAppState(STATE_JOINING);
    //   newCallObject.join({ url });
    // }
  }, []);

  /**
   * Starts leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    setAppState(STATE_LEAVING);
    callObject.leave();
  }, [callObject]);

  const completelyLeaveVideoChat = useCallback(async() => {
    if (!callObject) return;
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
    if (url === "public") {
      url && startJoiningPublicCall("https://onfour_test.daily.co/test_default_video_off");
      if (isInCrew) {
        switchToPublicVideoChat();
      } else {
        setIsPublic(true);
      }
      
    }
  }, [startJoiningPublicCall]);

  useEffect(() => {
    const url = roomUrlFromPageUrl();
    if (url === "private") {
      if (isInCrew) {
        url && startJoiningPrivateCall("https://onfour_test.daily.co/bar");
        switchToPrivateVideoChat();
      } else {
        setRoomUrl(null);
        setIsPublic(true);
      }
    }
  }, [startJoiningPrivateCall]);

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
   * Uncomment to attach call object to window for debugging purposes.
   */
  // useEffect(() => {
  //   window.callObject = callObject;
  // }, [callObject]);

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
  const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(appState);

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

  const switchToPublicVideoChat = () => {
    if (document.getElementById("public-room")) {
      document.getElementById("public-room").style.color = "white";
      document.getElementById("private-room").style.color = "rgb(173, 173, 173)";
      setIsPublic(true);
      startLeavingCall();
    }
  };

  const switchToPrivateVideoChat = () => {
    if (document.getElementById("public-room")) {
      document.getElementById("public-room").style.color = "rgb(173, 173, 173)";
      document.getElementById("private-room").style.color = "white";
      setIsPublic(false);
      startLeavingCall();
    }
  };

  const toggle_mute_unmute_all = () => {
    if (mute_all){
      setMuteAll(false);
      setMuteButtonMsg("MUTE ALL");
    } else {
      setMuteAll(true);
      setMuteButtonMsg("UNMUTE ALL");
    }
  }

  return (
    <div className={(artistView? "artist-": "")+ "app"} id="video-chat-main">
      {artistView? (
        null
      ): (
        <div>
          {!isInCrew ? (
            <div className="room-name-row">
              <div className="public-room only-public" id="public-room">
                PUBLIC
              </div>
            </div>
          ): (
            <div className="room-name-row">
              <div className="public-room click-active" id="public-room" onClick={switchToPublicVideoChat}>
                PUBLIC
              </div>
              <div className = "private-room click-active" id = "private-room" onClick = { switchToPrivateVideoChat }>
                {crew_name}
              </div>
            </div>
          )}
        </div>
      )}
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
          <Call roomUrl={roomUrl} artist_name={artist_name} isPublic={isPublic} artistView={artistView} colNum={colNum} mute_all={mute_all}/>
          <Tray
            disabled={!enableCallButtons}
            onClickLeaveCall={startLeavingCall}
            artistView={artistView}
            mute_function={toggle_mute_unmute_all}
            button_message={mute_button_msg}
          />
        </CallObjectContext.Provider>
      ) : (
        <div>
          {isPublic ? (
            <div>
              <StartButton
                disabled={!enableStartButton}
                onClick={() => {
                  createPublicCall().then(url => startJoiningPublicCall(url, layer1_bps, layer2_bps, frame_rate, resolution_width, resolution_height));
                }}
                artistView={artistView}
              />
              {!artistView? (
                <div className="public-video-notice">
                  By joining this video call, you will be seen by the artist as well as your crew members!
                </div>
              ): null}
              <form id="video-chat-params-form">
                <Grid>
                  <Row>
                    <Col size = {1}>
                      <input
                        className="video-form-input"
                        placeholder="layer1 bps"
                        required
                        {...layer1_bps}
                      />
                    </Col>
                    <Col size = {1}>
                      <input
                        className="video-form-input"
                        placeholder="layer2 bps"
                        required
                        {...layer2_bps}
                      />
                    </Col>
                    <Col size = {1}>
                      <input
                        className="video-form-input"
                        placeholder="frame rate"
                        required
                        {...frame_rate}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col size = {1}>
                      <input
                        className="video-form-input"
                        placeholder="width"
                        required
                        {...resolution_width}
                      />
                    </Col>
                    <Col size = {1}>
                      <input
                        className="video-form-input"
                        placeholder="height"
                        required
                        {...resolution_height}
                      />
                    </Col>
                  </Row>
                </Grid>
              </form>
            </div>
          ) : (
            <StartButton
              disabled={!enableStartButton}
              onClick={() => {
                createPrivateCall().then(url => startJoiningPrivateCall(url));
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
