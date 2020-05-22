// React Imports
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

// Styling Imports
import "./stream_styles.scss";

// Image Imports
import WaitingScreen from "../../images/backgrounds/stream_waiting_img.png";


// CounddownTime displays countdown message when the current time is behind the start time
// of the upcoming concert. When the time is up, it will display the stream video instead
function CountdownTimer(props) {
    // Later, this value should be extracted from the database
    const [show_start_time, setStartTime] = useState("2020-05-22T23:10:00.000-04:00"); // Stores the start time of upcoming concert

    // This function calculates the time difference between current time and show start time
    // and represent the difference in days, hours, minuts and seconds
    const calculateTimeLeft = () => {
        const difference = +new Date(show_start_time) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); // Stores the time difference

    // This is a React Hook function that gets called every 1 second
    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = []; // Stores the countdown message

    // This function loops through date, hours, minutes and seconds in
    // timeLeft and combine those together to render in React
    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span className="countdown-timer">
               {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div>
            {timerComponents.length ? (
                <div>
                    <img
                        className="waiting-screen"
                        src={WaitingScreen}
                        alt="waiting-screen"
                    ></img>
                    <div className="countdown-wrapper">
                        {timerComponents}
                    </div>
                </div>
                ) : (
                    <div className="player-wrapper">
                      <ReactPlayer
                        className="video-player"
                        url={props.url}
                        width="100%"
                        height="100%"
                        playing
                        controls
                      />
                    </div>
                )
            }
        </div>
    );
}
export default CountdownTimer;