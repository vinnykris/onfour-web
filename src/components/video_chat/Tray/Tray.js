import React, { useContext, useEffect, useState } from "react";
import speak_icon from "../../../images/video_chat_icons/radio_button_checked_24px.png";
import "./Tray.css";
import TrayButton, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  // TYPE_SCREEN,
  TYPE_LEAVE,
} from "../TrayButton/TrayButton";
import CallObjectContext from "../CallObjectContext";
import { logDailyEvent } from "../logUtils";
//import DailyIframe from "@daily-co/daily-js";

/**
 * Gets [isCameraMuted, isMicMuted, isSharingScreen].
 * This function is declared outside Tray() so it's not recreated every render
 * (which would require us to declare it as a useEffect dependency).
 */
function getStreamStates(callObject) {
  let isCameraMuted,
    isMicMuted,
    isSharingScreen = false;
  if (
    callObject &&
    callObject.participants() &&
    callObject.participants().local
  ) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
    isSharingScreen = localParticipant.screen;
  }
  return [isCameraMuted, isMicMuted, isSharingScreen];
}

/**
 * Props:
 * - onClickLeaveCall: () => ()
 * - disabled: boolean
 */
export default function Tray(props) {
  const callObject = useContext(CallObjectContext);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [isSharingScreen, setSharingScreen] = useState(false);
  const [isEnabledActiveSpeaker, setEnableActiveSpeaker] = useState(false);

  function toggleCamera() {
    callObject.setLocalVideo(isCameraMuted);
  }

  function toggleMic() {
    callObject.setLocalAudio(isMicMuted);
  }

  // function toggleSharingScreen() {
  //   isSharingScreen
  //     ? callObject.stopScreenShare()
  //     : callObject.startScreenShare();
  // }

  // function toggleActiveSpeaker() {
  //   const negate_value = !isEnabledActiveSpeaker;
  //   callObject.setActiveSpeakerMode(negate_value);
  //   setEnableActiveSpeaker(negate_value);
  // }

  function leaveCall() {
    props.onClickLeaveCall && props.onClickLeaveCall();
  }

  let item = document.getElementById("press-to-talk");
  let timerID;
  let counter = 0;

  let pressHoldEvent = new CustomEvent("pressHold");

  // Increase or decreae value to adjust how long
  // one should keep pressing down before the pressHold
  // event fires
  let pressHoldDuration = 10;

  useEffect(() => {
    if (item) {
      // console.log("getting item");
      // Listening for the mouse and touch events
      item.addEventListener("mousedown", pressingDown, false);
      item.addEventListener("mouseup", notPressingDown, false);
      item.addEventListener("mouseleave", notPressingDown, false);

      item.addEventListener("touchstart", pressingDown, false);
      item.addEventListener("touchend", notPressingDown, false);

      // // Listening for space bar pressing event
      // document.addEventListener("keypress", pressingSpaceDown, false);
      // document.addEventListener("keyup", notPressingSpaceDown, false);

      // Listening for our custom pressHold event
      item.addEventListener("pressHold", doSomething, false);
    }
  }, [item]);

  function pressingDown(e) {
    // Start the timer
    requestAnimationFrame(timer);
    e.preventDefault();
  }

  function pressingSpaceDown(e) {
    if (e.charCode === 32 || e.keyCode === 32) {
      requestAnimationFrame(timer);
    }
    e.preventDefault();
  }

  function notPressingSpaceDown(e) {
    if (e.charCode === 32 || e.keyCode === 32) {
      cancelAnimationFrame(timerID);
      counter = 0;
      callObject.setLocalAudio(false);
    }
    e.preventDefault();
  }

  function notPressingDown(e) {
    // Stop the timer
    cancelAnimationFrame(timerID);
    counter = 0;
    callObject.setLocalAudio(false);
    e.preventDefault();
  }

  //
  // Runs at 60fps when you are pressing down
  //
  function timer() {
    if (counter < pressHoldDuration) {
      timerID = requestAnimationFrame(timer);
      counter++;
    } else {
      item.dispatchEvent(pressHoldEvent);
    }
  }

  function doSomething(e) {
    callObject.setLocalAudio(true);
    
  }

  /**
   * Start listening for participant changes when callObject is set (i.e. when the component mounts).
   * This event will capture any changes to your audio/video mute state.
   */
  useEffect(() => {
    if (!callObject) return;

    function handleNewParticipantsState(event) {
      event && logDailyEvent(event);
      const [isCameraMuted, isMicMuted, isSharingScreen] = getStreamStates(
        callObject
      );
      setCameraMuted(isCameraMuted);
      setMicMuted(isMicMuted);
      setSharingScreen(isSharingScreen);
    }

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    callObject.on("participant-updated", handleNewParticipantsState);

    // Stop listening for changes in state
    return function cleanup() {
      callObject.off("participant-updated", handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <div className="tray">
      {!props.artistView ? (
        <div>
          <TrayButton
            type={TYPE_MUTE_CAMERA}
            disabled={props.disabled}
            highlighted={isCameraMuted}
            onClick={toggleCamera}
          />
          <TrayButton
            type={TYPE_MUTE_MIC}
            disabled={props.disabled}
            highlighted={isMicMuted}
            onClick={toggleMic}
          />
          <button id="press-to-talk" className="press-to-talk-btn">
            <img src={speak_icon}></img>
          </button>
        </div>
      ) : (
        <button
          type="unmute-all"
          className="artist-mute-all-button"
          disabled={props.disabled}
          highlighted={props.button_message === "MUTE ALL"}
          onClick={props.mute_function}
        >
          {props.button_message}
        </button>
      )}
      {/* <TrayButton
        type={TYPE_SCREEN}
        disabled={props.disabled}
        highlighted={isEnabledActiveSpeaker}
        onClick={toggleActiveSpeaker}
      /> */}

      {/* {DailyIframe.supportedBrowser().supportsScreenShare && (
        <TrayButton
          type={TYPE_SCREEN}
          disabled={props.disabled}
          highlighted={isSharingScreen}
          onClick={toggleSharingScreen}
        />
      )} */}
      <TrayButton
        type={TYPE_LEAVE}
        disabled={props.disabled}
        newButtonGroup={true}
        highlighted={true}
        onClick={leaveCall}
      />
    </div>
  );
}
