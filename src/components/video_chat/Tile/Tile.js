import React, { useEffect, useRef, useState } from "react";
import "./Tile.scss";
import RangeSlider from "react-bootstrap-range-slider";
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
  const video_component_id = "video" + random_id.toString();
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

  useEffect(() => {
    if (document.getElementById(audio_component_id)) {
      document.getElementById(audio_component_id).volume = props.volume;
    }
  }, [props.volume]);

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
      props.audioTrack && (
        <audio
          className="audio-all"
          id={audio_component_id}
          autoPlay
          muted={audioMute}
          playsInline
          ref={audioEl}
        />
      )
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
    if (props.artistView) {
      if (document.getElementById(random_id)) {
        if (mute_all) {
          document.getElementById(random_id).style.opacity = "100";
          setAudioMute(true);
        } else {
          setAudioMute(false);
        }
      }
    }
  }

  useEffect(() => {
    if (props.artistView) {
      toggle_audio_mute(props.mute_all);
    }
  }, [props.mute_all]);

  useEffect(() => {
    reflect_audio_change(props.audioTrack);
  }, [props.audioTrack]);

  function reflect_audio_change(audioTrack) {
    if (document.getElementById(fans_microphone_id)) {
      if (audioTrack) {
        document.getElementById(fans_microphone_id).style.opacity = "0";
        if (document.getElementById(video_component_id)) {
          document.getElementById(video_component_id).style.border =
            "2px solid #E465A2";
        }
      } else {
        document.getElementById(fans_microphone_id).style.opacity = "100";
        if (document.getElementById(video_component_id)) {
          document.getElementById(video_component_id).style.border = "none";
        }
      }
    }
    if (document.getElementById(random_id)) {
      if (!props.mute_all) {
        if (audioTrack) {
          document.getElementById(random_id).style.opacity = "0";
          if (document.getElementById(video_component_id)) {
            document.getElementById(video_component_id).style.border =
              "2px solid #E465A2";
          }
        } else {
          document.getElementById(random_id).style.opacity = "100";
          if (document.getElementById(video_component_id)) {
            document.getElementById(video_component_id).style.border = "none";
          }
        }
      }
    }
  }

  return !props.isArtist ? (
    <div className={getClassNames()} id={video_component_id}>
      <div className="background" />
      {/* {!props.isLocalPerson ? (
          <div> */}
      <div className="name-card">
        {" "}
        {props.artistView ? (
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
        <div className="video-call-participant-name tag-text">
          {props.username}
        </div>
      </div>

      {getLoadingComponent()}
      {getVideoComponent()}
      {getAudioComponent()}
    </div>
  ) : null;
}
