import React, { useEffect, useContext, useReducer } from "react";
import "./Call.css";
import Tile from "../Tile/Tile";
import CallObjectContext from "../CallObjectContext";
import CallMessage from "../CallMessage/CallMessage";
import {
  initialCallState,
  CLICK_ALLOW_TIMEOUT,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  //isScreenShare,
  //containsScreenShare,
  getMessage,
} from "./callState";
import { logDailyEvent } from "../logUtils";
// import { propTypes } from "react-bootstrap-range-slider";

export default function Call(props) {
  const callObject = useContext(CallObjectContext);
  if (callObject) {
    callObject.setBandwidth({
      kbs: 30,
      trackConstraints: { width: 320, height: 180, frameRate: 6 },
    });
  }

  const [callState, dispatch] = useReducer(callReducer, initialCallState);

  /**
   * Start listening for participant changes, when the callObject is set.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = [
      "participant-joined",
      "participant-updated",
      "participant-left",
    ];

    function handleNewParticipantsState(event) {
      event && logDailyEvent(event);
      dispatch({
        type: PARTICIPANTS_CHANGE,
        participants: callObject.participants(),
      });
      // console.log(callObject.participants());
    }

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewParticipantsState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewParticipantsState);
      }
    };
  }, [callObject]);

  /**
   * Start listening for call errors, when the callObject is set.
   */
  useEffect(() => {
    if (!callObject) return;

    function handleCameraErrorEvent(event) {
      logDailyEvent(event);
      dispatch({
        type: CAM_OR_MIC_ERROR,
        message:
          (event && event.errorMsg && event.errorMsg.errorMsg) || "Unknown",
      });
    }

    // We're making an assumption here: there is no camera error when callObject
    // is first assigned.

    callObject.on("camera-error", handleCameraErrorEvent);

    return function cleanup() {
      callObject.off("camera-error", handleCameraErrorEvent);
    };
  }, [callObject]);

  /**
   * Start listening for fatal errors, when the callObject is set.
   */
  useEffect(() => {
    if (!callObject) return;

    function handleErrorEvent(e) {
      logDailyEvent(e);
      dispatch({
        type: FATAL_ERROR,
        message: (e && e.errorMsg) || "Unknown",
      });
    }

    // We're making an assumption here: there is no error when callObject is
    // first assigned.

    callObject.on("error", handleErrorEvent);

    return function cleanup() {
      callObject.off("error", handleErrorEvent);
    };
  }, [callObject]);

  /**
   * Start a timer to show the "click allow" message, when the component mounts.
   */
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch({ type: CLICK_ALLOW_TIMEOUT });
    }, 1500);

    return function cleanup() {
      clearTimeout(t);
    };
  }, []);

  function getTiles() {
    let largeTiles = [];
    let smallTiles = [];
    Object.entries(callState.callItems).forEach(([id, callItem]) => {
      // const isLarge =
      //   isScreenShare(id) ||
      //   (!isLocal(id) && !containsScreenShare(callState.callItems));
      // console.log(id, callItem);
      const isLarge = false;
      const tile = (
        <Tile
          key={id}
          videoTrack={callItem.videoTrack}
          audioTrack={callItem.audioTrack}
          isLocalPerson={isLocal(id)}
          isLarge={isLarge}
          isLoading={callItem.isLoading}
          artistView={props.artistView}
          isArtist={props.artist_name === callItem.username}
          mute_all={props.mute_all}
          username={callItem.username}
          volume={props.volume}
        />
      );
      if (isLarge) {
        largeTiles.push(tile);
      } else {
        smallTiles.push(tile);
      }
    });
    return [largeTiles, smallTiles];
  }

  const [largeTiles, smallTiles] = getTiles();
  const message = getMessage(callState, props.isPublic);
  return (
    <div className={(props.artistView ? "artist-" : "") + "call"}>
      <div
        className={
          (props.artistView ? "artist-" : "") +
          "small-tiles" +
          (props.colNum === 6 ? "-wide" : "")
        }
      >
        {smallTiles}
      </div>
      {message && (
        <CallMessage
          header={message.header}
          detail={message.detail}
          artistView={props.artistView}
          isError={message.isError}
        />
      )}
    </div>
  );
}
