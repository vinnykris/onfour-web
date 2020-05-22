import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./stream_styles.scss";
import WaitingScreen from "../../images/backgrounds/stream_waiting_img.png";

function CountdownTimer(props) {
    const [show_start_time, setStartTime] = useState("2020-05-22T23:10:00.000-04:00");

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

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

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