import React, { useEffect, useState } from "react";
import "./stream_styles.scss";
import ArchiveVideo from "../archive_page/archive_video";

function CountdownTimer() {
    const [show_start_time, setStartTime] = useState("2020-05-21T14:36:00.000-04:00");

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
            {timerComponents.length ? timerComponents : <ArchiveVideo
                src="https://www.youtube.com/embed/EOgrorpN9rw"
                songName="4/24/20 Jonathan Dely-Strasbourg/St. Denis"
            />}
        </div>
    );
}
export default CountdownTimer;