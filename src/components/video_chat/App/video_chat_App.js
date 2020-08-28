import React, { useEffect, useState, useCallback } from "react";
//Component imports
import { useInputValue } from "../../custom_hooks";
import Call from "../Call/Call";
import StartButton from "../StartButton/StartButton";
import api from "../api";
import "./App.scss";
// import "../../../styles.scss";
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
const owner_name = [
  "takoyuxin",
  "onfour-yuxin",
  "onfour-spencer",
  "spencer",
  "onfour-vinod",
  "vinnykris",
  "alilyen",
  "onfour-bar",
  "barkadosh",
];
const crew_name = "onfour Crew";

export default function VideoChatApp({
  user_name,
  artist_name,
  artistView,
  colNum,
  stream_vol_adjust,
}) {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [mute_all, setMuteAll] = useState(true);
  const [mute_button_msg, setMuteButtonMsg] = useState("UNMUTE ALL");
  const [volume, setVolume] = useState(1);
  const [current_room, setCurrentRoom] = useState("");
  const isInCrew = owner_name.indexOf(user_name) >= 0;
  // const self_create_room_name = useInputValue(roomUrl ? roomUrl : "");
  const [already_created_room_name, setCreatedRoomName] = useState("");
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const [error_msg, setErrorMsg] = useState('');

  /**
   * Creates a new call room.
   */
  const createPublicCall = useCallback(async (room_name, is_created) => {
    setAppState(STATE_CREATING);
    console.log(is_created);
    let response = await api.createRoom(room_name, is_created);
    if (response.url) {
      return response.url
    } else if (response.error) {
      setErrorMsg(response.info);
      setRoomUrl(null);
      setAppState(STATE_IDLE);
      throw "error creating room";
    }
    // return api
    //   .createRoom(room_name, is_created)
    //   .then((room) => {
    //     room.url
    //   })
    //   .catch((error) => {
    //     console.log("Error creating room", error);
    //     setRoomUrl(null);
    //     setAppState(STATE_IDLE);
    //   });
  }, []);

  // const createPrivateCall = useCallback(() => {
  //   setAppState(STATE_CREATING);
  //   return api
  //     .createRoom(false)
  //     .then((room) => room.url)
  //     .catch((error) => {
  //       console.log("Error creating room", error);
  //       setRoomUrl(null);
  //       setAppState(STATE_IDLE);
  //     });
  // }, []);

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
    const newToken = await getToken(user_name, url.split("/").pop());
    const newCallObject = DailyIframe.createCallObject({
      userName: user_name,
      token: newToken,
    });
    setRoomUrl(url.split("/").pop());
    // console.log("joining_video_call!");
    // setRoomUrl("public");
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url });
  }, []);

  const startJoiningPrivateCall = useCallback(async (url) => {
    if (owner_name.indexOf(user_name) >= 0) {
      const newToken = await getToken(user_name);
      console.log(newToken);
      const newCallObject = DailyIframe.createCallObject({
        userName: user_name,
        token: newToken,
      });
      setRoomUrl(url);
      setRoomUrl("private");
      setCallObject(newCallObject);
      setAppState(STATE_JOINING);
      newCallObject.join({ url });
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
    if (url === "room1") {
      url && startJoiningPublicCall("https://onfour.daily.co/room1");
      switchRoom(0);
      setCurrentRoom("room1");
      setIsPublic(true);
    } else if (url === "room2") {
      url && startJoiningPublicCall("https://onfour.daily.co/room2");
      switchRoom(1);
      setCurrentRoom("room2");
      setIsPublic(true);
    } else if (url === "room3") {
      url && startJoiningPublicCall("https://onfour.daily.co/room3");
      switchRoom(2);
      setCurrentRoom("room3");
      setIsPublic(true);
    } else if (url) {
      url && startJoiningPublicCall("https://onfour.daily.co/" + url);
      switchRoom(3);
      setCurrentRoom(url);
      setCreatedRoomName(url);
      setIsRoomCreated(true);
      setIsPublic(false);
    }

    // if (url === "public") {
    //   url && startJoiningPublicCall("https://onfour.daily.co/room1");
    //   if (isInCrew) {
    //     switchToPublicVideoChat();
    //   } else {
    //     setIsPublic(true);
    //   }
    // }
  }, [startJoiningPublicCall]);

  // useEffect(() => {
  //   const url = roomUrlFromPageUrl();
  //   if (url === "private") {
  //     if (isInCrew) {
  //       url && startJoiningPrivateCall("https://onfour_test.daily.co/bar");
  //       switchToPrivateVideoChat();
  //     } else {
  //       setRoomUrl(null);
  //       setIsPublic(true);
  //     }
  //   }
  // }, [startJoiningPrivateCall]);

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
          setTimeout(function () {
            callObject.destroy().then(() => {
              setRoomUrl(null);
              setCallObject(null);
              setAppState(STATE_IDLE);
            });
          }, 3000);
          console.log(appState);
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

  // useEffect(() => {
  //   document.getElementById("public-room" + current_room.substr(current_room.length - 1)).style.color = "white";
  // }, []);

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

  const room_ids = [
    "public-room-1",
    "public-room-2",
    "public-room-3",
    // isRoomCreated? already_created_room_name : "create-room",
    "create-room"
  ];

  const switchRoom = (room_number) => {
    // if (document.getElementById("public-room-1")) {
    //   document.getElementById("public-room-1").style.color = "white";
    //   document.getElementById("private-room").style.color =
    //     "rgb(173, 173, 173)";
    //   setIsPublic(true);
    //   startLeavingCall();
    // }
    startLeavingCall();
    setCurrentRoom("room" + (room_number + 1));
    if (room_number === 3) {
      setIsPublic(false);
      setCurrentRoom(already_created_room_name);
    } else {
      setIsPublic(true);
    }
    const selected = room_ids[room_number];
    for (const index in room_ids) {
      if (room_ids[index] != selected) {
        //const element = object[key];
        // document.getElementById(room_ids[index]).style.color =
        //   "rgb(173, 173, 173) !important";
        document.getElementById(room_ids[index]).classList.add("room-others");
        document
          .getElementById(room_ids[index])
          .classList.remove("room-selected");
      }
    }
    // document.getElementById(selected).style.color = "white !important";
    document.getElementById(selected).classList.add("room-selected");
    document.getElementById(selected).classList.remove("room-others");
  };

  const switchToPrivateVideoChat = () => {
    if (document.getElementById("public-room")) {
      document.getElementById("public-room").style.color =
        "rgb(173, 173, 173)";
      document.getElementById("private-room").style.color =
        "white";
      setIsPublic(false);
      startLeavingCall();
    }
  };

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
    "room1": 4,
    "room2": 6,
    "room3": 10
  };
  
  return (
    <div className={(artistView ? "artist-" : "") + "app"} id="video-chat-main">
      {artistView ? null : (
        <div>
          {/* {!isInCrew ? (
            <div className="room-name-row">
              <div className="public-room only-public" id="public-room">
                PUBLIC
              </div>
            </div>
          ) : ( */}
          <div className="room-name-row">
            <div
              className="body-2 public-room click-active"
              onClick={() => switchRoom(3)}
            >
              <div
                // id={isRoomCreated ? already_created_room_name : "create-room"}
                id="create-room"
                className="body-2 room-tab-text room1"
              >
                {/* {isRoomCreated ? already_created_room_name : "Create Room"} */}
                My Room
              </div>
            </div>
            <div
              className="public-room click-active"
              onClick={() => switchRoom(0)}
            >
              <div
                id="public-room-1"
                className="body-2 room-tab-text room-others"
              >
                Room 1
              </div>
            </div>
            <div
              className="public-room click-active"
              onClick={() => switchRoom(1)}
            >
              <div
                id="public-room-2"
                className="body-2 room-tab-text room-others"
              >
                Room 2
              </div>
            </div>
            <div
              className="public-room click-active"
              onClick={() => switchRoom(2)}
            >
              <div
                id="public-room-3"
                className="body-2 room-tab-text room-others"
              >
                Room 3
              </div>
            </div>
          </div>
          {/* )} */}
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
          <Call
            roomUrl={roomUrl}
            artist_name={artist_name}
            isPublic={isPublic}
            artistView={artistView}
            colNum={colNum}
            mute_all={mute_all}
            volume={volume}
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
          {isPublic ? (
            <div className="enter-video-chat-prompt">
              {!artistView ? (
                <div className="public-video-notice">
                  Please use headphones to avoid audio feedback issues. This is
                  a public room, so get ready to make some new friends!
                </div>
              ) : null}
              <StartButton
                create_room={false}
                disabled={!enableStartButton}
                onClick={() => {
                  createPublicCall(current_room, isRoomCreated).then((url) =>
                    startJoiningPublicCall(url)
                  );
                }}
                artistView={artistView}
              />
            </div>
          ) : // <StartButton
          //   disabled={!enableStartButton}
          //   onClick={() => {
          //     createPrivateCall().then((url) => startJoiningPrivateCall(url));
          //   }}
          // />
          isRoomCreated ? (
            <div className="enter-video-chat-prompt">
              <StartButton
                create_room={false}
                disabled={!enableStartButton}
                onClick={() => {
                  createPublicCall(current_room, isRoomCreated).then((url) =>
                    startJoiningPublicCall(url)
                  );
                }}
                artistView={artistView}
              />
            </div>
          ) : (
            <div className="enter-video-chat-prompt">
              {/* <input
                className="create-room-name-input"
                placeholder="room name"
                {...self_create_room_name}
              /> */}
              <div className="public-video-notice">
                Create my own private room and invite my friends!
              </div>
              <StartButton
                create_room={true}
                disabled={!enableStartButton}
                onClick={() => {
                  createPublicCall("my room", isRoomCreated)
                    .then((url) => {
                      startJoiningPublicCall(url);
                      setIsRoomCreated(true);
                      setCreatedRoomName(url.split("/").pop());
                      // setCreatedRoomName(self_create_room_name.value);
                      setCurrentRoom(url.split("/").pop());
                    })
                    .catch((err) => console.log(err));
                }}
                artistView={artistView}
              />
              {error_msg ? (
                <p className="create-room-error">{error_msg}</p>
              ) : (
                <p className="room-max-msg">{error_msg}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
