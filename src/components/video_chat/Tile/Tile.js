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
  const fans_microphone_id = "fans-mic" + random_id.toString();

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


  // const [volume_value, setVolumeValue] = useState(100); 

  // function changeVolume() {
  //   if (document.getElementById(audio_component_id)) {
  //     document.getElementById(audio_component_id).volume = volume_value / 100;
  //   }
  // }

  function toggle_audio_mute(mute_all) {
    if (document.getElementById(random_id)) {
      if (mute_all) {
        document.getElementById(random_id).style.display = "inline";
        setAudioMute(true);
      } else {
        document.getElementById(random_id).style.display = "none";
        setAudioMute(false);
      }
    }
  }

  useEffect(() => {
    if (props.artistView) {
    toggle_audio_mute(props.mute_all)
    }
  }, [props.mute_all])


  useEffect(() => {
    if (!props.isLocalPerson) {
      reflect_audio_change(props.audioTrack);
    }
  }, [props.audioTrack])

  function reflect_audio_change(audioTrack) {
    if (document.getElementById(fans_microphone_id)) {
      if (audioTrack) {
        document.getElementById(random_id).style.display = "none";
      } else {
        document.getElementById(random_id).style.display = "inline";
      }
    }
  }

  return (
    !props.isArtist ? (
      <div className={getClassNames()}>
        <div className="background" />
        {!props.isLocalPerson ? (
          <div>
            {props.artistView? (
              <i 
                className="fa fa-microphone-slash mute-others-icon" 
                id={random_id} 
              ></i>
            ) : (
              <i
                className="fa fa-microphone-slash mute-others-icon"
                id={fans_microphone_id}
              ></i>
            )}
            {/* <div className="range-slider-container">
              <RangeSlider
                value={volume_value}
                onChange={changeEvent => {
                  setVolumeValue(changeEvent.target.value);
                  changeVolume(changeEvent.target.value);
                }}
              />
            </div> */}
          </div>
        ):null}
        <div className="video-call-participant-name">
          {props.username}
        </div>
        {getLoadingComponent()}
        {getVideoComponent()}
        {getAudioComponent()}
      </div>
    ) : null
  );
}
