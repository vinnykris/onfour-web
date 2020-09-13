// React Imports
import React, { useEffect, useState } from "react";

// Styling Imports
import "./countdown_timer_styles.scss";
import { Grid, Row, Col } from "../grid";

function CountdownTimer({
  start_date,
  start_time,
  time_up_message,
  className,
}) {
  //const [difference_copy, setDifferenceCopy] = useState(0);
  // This function calculates the time difference between current time and show start time
  // and represent the difference in days, hours, minuts and seconds
  const calculateTimeLeft = () => {
    //console.log("calculating time left");
    const difference =
      +new Date(start_date + "T" + start_time + ".000-04:00") - +new Date();
    // setDifferenceCopy(difference);
    let time_left = {};

    if (difference > 0) {
      time_left = {
        DAYS: Math.floor(difference / (1000 * 60 * 60 * 24)),
        HOURS: Math.floor((difference / (1000 * 60 * 60)) % 24),
        MINUTES: Math.floor((difference / 1000 / 60) % 60),
        SECONDS: Math.floor((difference / 1000) % 60),
      };
    } else {
      time_left = {
        DAYS: 0,
        HOURS: 0,
        MINUTES: 0,
        SECONDS: 0,
      };
    }

    return time_left;
  };

  const [time_left, setTimeLeft] = useState(calculateTimeLeft()); // Stores the time difference

  // This is a React Hook function that gets called every second
  useEffect(() => {
    if (
      time_left.DAYS +
        time_left.HOURS +
        time_left.MINUTES +
        time_left.SECONDS ==
      0
    ) {
      setTimeLeft({ DAYS: 0, HOURS: 0, MINUTES: 0, SECONDS: 0 });
    }
    const interval = setInterval(() => {
      if (
        time_left.DAYS +
          time_left.HOURS +
          time_left.MINUTES +
          time_left.SECONDS ==
        0
      ) {
        setTimeLeft({ DAYS: 0, HOURS: 0, MINUTES: 0, SECONDS: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft(calculateTimeLeft());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timer_components = []; // Stores the countdown message
  //const timer_placeholder = []; // Placehoder to store the countdown message
  // For timer_components, the value for hours, minutes, etc is always two diigits
  // and when it's zero, it will be represented as 00.
  // However, for timer_placeholder, if one element counts towards zero, the length of that element value
  // will be zero unlike timer_components

  // This function loops through date, hours, minutes and seconds in
  // timeLeft and combine those together to render in React
  Object.keys(time_left).forEach((interval) => {
    if (!time_left[interval]) {
      timer_components.push(
        <Col size={1} className="countdown-timer-block">
          <Row>
            {interval === "SECONDS" ? (
              <span className={className}>00</span>
            ) : (
              <span className={className}>00:</span>
            )}
          </Row>
        </Col>
      );
    } else {
      if (time_left[interval] > 9) {
        timer_components.push(
          <Col size={1} className="countdown-timer-block">
            <Row>
              <span className={className}>
                {interval === "SECONDS" ? (
                  <span className={className}>{time_left[interval]}</span>
                ) : (
                  <span className={className}>{time_left[interval]}:</span>
                )}
              </span>
            </Row>
          </Col>
        );
      } else {
        timer_components.push(
          <Col size={1} className="countdown-timer-block">
            <Row>
              <span className={className}>
                {interval === "SECONDS" ? (
                  <span className={className}>0{time_left[interval]}</span>
                ) : (
                  <span className={className}>0{time_left[interval]}:</span>
                )}
              </span>
            </Row>
          </Col>
        );
      }
    }
  });

  // Showing the countdown when the show has not started yet
  return (
    <div className="countdown-timer-wrapper">
      <div className="countdown-timer-component-wrapper">
        <Grid>
          <Row>{timer_components}</Row>
        </Grid>
      </div>
    </div>
  );
}
export default CountdownTimer;
