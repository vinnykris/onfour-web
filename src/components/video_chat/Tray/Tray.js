import React, { useContext, useEffect, useState } from "react";
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
import RangeSlider from "react-bootstrap-range-slider";

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
  const [camera_icon, setCameraIcon] = useState("fas fa-video unmuted");
  const [mic_icon, setMicIcon] = useState("fas fa-microphone unmuted");
  const [volume_icon, setVolumeIcon] = useState("fas fa-volume-up unmuted");
  const [current_volume, setCurrentVol] = useState(100);
  //const [leave_icon, setLeaveIcon] = useState("")
  // var camera_icon = "fa fa-microphone-slash";
  // var mic_icon = "fa fa-microphone-slash";
  // var leave_icon = "fa fa-microphone-slash";

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

  function switchCameraIcon() {
    if (camera_icon == "fas fa-video-slash muted") {
      console.log("camera should be on");
      setCameraIcon("fas fa-video unmuted");
      setCameraMuted(false);
      toggleCamera();
    } else {
      console.log("camera should be off");
      setCameraIcon("fas fa-video-slash muted");
      setCameraMuted(true);
      toggleCamera();
    }
  }

  function switchMicIcon() {
    if (mic_icon == "fas fa-microphone-slash muted") {
      setMicIcon("fas fa-microphone unmuted");
      setMicMuted(false);
      toggleMic();
    } else {
      setMicIcon("fas fa-microphone-slash muted");
      setMicMuted(true);
      toggleMic();
    }
  }

  function switchVolumeIcon() {
    if (volume_icon == "fas fa-volume-mute volume-icon muted") {
      setVolumeIcon("fas fa-volume-up unmuted");
      props.adjust_volume(current_volume);
    } else {
      setVolumeIcon("fas fa-volume-mute volume-icon muted");
      console.log(props.volume);
      setCurrentVol(props.volume);
      props.adjust_volume(0);
    }
  }

  function reflect_speaker(volume) {
    if (volume > 0) {
      setVolumeIcon("fas fa-volume-up unmuted");
    }
  }

  return (
    <div className="tray">
      {!props.artistView ? (
        <div className="tray-icon-row">
          {/* <TrayButton
            type={TYPE_MUTE_CAMERA}
            disabled={props.disabled}
            highlighted={isCameraMuted}
            onClick={toggleCamera}
          /> */}
          <button
            type={TYPE_MUTE_CAMERA}
            className="tray-button"
            onClick={switchCameraIcon}
            disabled={props.disabled}
          >
            <i className={camera_icon}></i>
          </button>
          {/* <TrayButton
            type={TYPE_MUTE_MIC}
            disabled={props.disabled}
            highlighted={isMicMuted}
            onClick={toggleMic}
          />
          <div className="volume-container">
            <i class="fas fa-volume-up volume-icon"></i>
            <RangeSlider
              className="volume-slider"
              value={props.volume * 100}
              onChange={(changeEvent) =>
                props.adjust_volume(changeEvent.target.value / 100)
              }
              variant="dark"
            />
          </div>
          /> */}
          {/* <button
            type={TYPE_MUTE_MIC}
            className="tray-button"
            onClick={switchMicIcon}
            disabled={props.disabled}
          >
            <i className={mic_icon}></i>
          </button> */}

          <div className="volume-container">
            <button
              type="unmute-all"
              className="tray-button"
              disabled={props.disabled}
              //highlighted={props.button_message === "MUTE ALL"}
              onClick={switchVolumeIcon}
            >
              <i className={volume_icon}></i>
            </button>
            <RangeSlider
              className="volume-slider"
              id="range-slider-haha"
              value={props.volume * 100}
              onChange={(changeEvent) => {
                props.adjust_volume(changeEvent.target.value / 100);
                reflect_speaker(changeEvent.target.value);
              }}
              variant="dark"
            />
          </div>
          <button className="tray-talk-button">Press and hold to talk</button>
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
