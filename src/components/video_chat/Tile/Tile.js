import React, { useEffect, useRef, useState } from "react";
import "./Tile.css";
import RangeSlider from 'react-bootstrap-range-slider';
import "./range_slider.css";

/**
 * Props
 * - videoTrack: MediaStreamTrack?
 * - audioTrack: MediaStreamTrack?
 * - isLocalPerson: boolean
 * - isLarge: boolean
 * - isLoading: boolean
 */
export default function Tile(props) {
  const videoEl = useRef(null);
  const audioEl = useRef(null);

  const [audioMute, setAudioMute] = useState(false);
  const random_id = Math.random();
  const audio_component_id = "audio" + random_id.toString();

  /**
   * When video track changes, update video srcObject
   */
  useEffect(() => {
    videoEl.current &&
      (videoEl.current.srcObject = new MediaStream([props.videoTrack]));
  }, [props.videoTrack]);

  /**
   * When audio track changes, update audio srcObject
   */
  useEffect(() => {
    audioEl.current &&
      (audioEl.current.srcObject = new MediaStream([props.audioTrack]));
  }, [props.audioTrack]);

  function getLoadingComponent() {
    return props.isLoading && <p className="loading">Loading...</p>;
  }

  function getVideoComponent() {
    return (
      props.videoTrack && <video autoPlay muted playsInline ref={videoEl} />
    );
  }

  function getAudioComponent() {
    return (
      !props.isLocalPerson &&
      props.audioTrack && <audio className="audio-all" id={audio_component_id} autoPlay muted={audioMute} playsInline ref={audioEl} />
    );
  }


  function getClassNames() {
    let classNames = "tile";
    classNames += props.isLarge ? " large" : " small";
    props.isLocalPerson && (classNames += " local");
    classNames += props.artistView ? " artist" : "";
    return classNames;
  }


  function toggle_audio_mute() {
    if (document.getElementById(random_id)) {
      if (document.getElementById(random_id).style.color === "red") {
        document.getElementById(random_id).style.color = "white";
        setAudioMute(false);
      }
      else {
        document.getElementById(random_id).style.color = "red";
        setAudioMute(true);
      }
    }
  }

  // useEffect(() => {
  //   if (props.artistView) {
  //     toggle_audio_mute();
  //   }
  // }, [])

  useEffect(() => {
    if(props.artistView) {
      toggle_audio_mute()
    }
  }, [props.mute_all])

  const [volume_value, setVolumeValue] = useState(100); 

  function changeVolume() {
    if (document.getElementById(audio_component_id)) {
      document.getElementById(audio_component_id).volume = volume_value / 100;
    }
  }


  return (
    <div className={getClassNames()}>
      <div className="background" />
      {!props.isLocalPerson ? (
        <div>
          <i className="fa fa-microphone-slash mute-others-icon" id={random_id} onClick={toggle_audio_mute}></i>
          <div className="range-slider-container">
            <RangeSlider
              value={volume_value}
              onChange={changeEvent => {
                setVolumeValue(changeEvent.target.value);
                changeVolume(changeEvent.target.value);
              }}
            />
          </div>
        </div>
      ):null}
      {getLoadingComponent()}
      {getVideoComponent()}
      {getAudioComponent()}
    </div>
  );
}
