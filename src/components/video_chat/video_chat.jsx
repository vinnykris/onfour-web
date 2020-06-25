import React, { useEffect, useState, useCallback } from "react";
// import Call from "../Call/Call";
// import StartButton from "../StartButton/StartButton";
// import api from "../../api";
import "./video_chat_styles.scss";
// import Tray from "../Tray/Tray";
// import CallObjectContext from "../../CallObjectContext";
// import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../../urlUtils";
// import DailyIframe from "@daily-co/daily-js";
// import { logDailyEvent } from "../../logUtils";

useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
        event && logDailyEvent(event);
        switch (callObject.meetingState()) {
            case "joined-meeting":
                // update component state to a "joined" state...
                break;
            case "left-meeting":
                callObject.destroy().then(() => {
                    // update component state to a "left" state...
                });
                break;
            case "error":
                // update component state to an "error" state...
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
