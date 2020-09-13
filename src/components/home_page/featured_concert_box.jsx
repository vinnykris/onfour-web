import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { Grid, Row, Col } from "../grid";
import Tag from "../tag";
import PrimaryButton from "../primary_button";
import history from "../../history";

const FeaturedConcertBox = ({ artist_info, concert_info, width }) => {
  const [days_left, setDaysLeft] = useState();
  const [artist_name, setArtistName] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [concert_id, setConcertID] = useState("");
  const [loaded, setLoaded] = useState(false);

  const parseDateTime = (concert_date, concert_time) => {
    const concert_date_object = moment(
      concert_date + " " + concert_time + "-0400"
    );
    // setDaysLeft(concert_date_object.endOf("day").fromNow());
    const time_left =
      +new Date(concert_date + "T24:00:00.000-04:00") - +new Date();
    setDaysLeft(Math.floor(time_left / (1000 * 60 * 60 * 24)));
    setDay(concert_date_object.format("dddd"));
    setDate(concert_date_object.format("DD MMMM YYYY"));
    if (Math.floor(parseInt(concert_time.slice(0, 2)) / 12) > 0) {
      setTime(
        parseInt(concert_time.slice(0, 2) - 12) +
          ":" +
          concert_time.slice(3, 5) +
          " PM EST"
      );
    } else {
      setTime(
        parseInt(concert_time.slice(0, 2)) +
          ":" +
          concert_time.slice(3, 5) +
          " AM EST"
      );
    }
  };

  useEffect(() => {
    if (artist_info && concert_info) {
      setArtistName(artist_info.artist_name);
      setConcertID(concert_info.id);
      parseDateTime(concert_info.date, concert_info.time);
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [artist_info, concert_info]);

  return (
    <Grid>
      {loaded ? (
        width > 600 ? (
          <div>
            <Row>
              <Col className="tag-container">
                <Tag content={"In " + days_left + " days"} />
              </Col>
            </Row>
            <Row className="featured-concert-box-row">
              <Col>
                <div className="header-3">{artist_name}</div>
              </Col>
            </Row>
            <Row className="featured-concert-box-row">
              <Col>
                <div className="subtitle-1">
                  {day} | {date} | {time}
                </div>
              </Col>
            </Row>
            <Row className="featured-concert-box-row">
              <Col>
                {/* <PrimaryButton
              content="PEEK INSIDE"
              action={() => history.push("/upcoming/" + concert_id)}
            /> */}
                <button
                  className="primary-button button-text featured-concert-action-button"
                  onClick={() => history.push("/upcoming/" + concert_id)}
                >
                  PEEK INSIDE
                </button>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Row>
              <Col className="mobile-tag-container">
                <Tag content={"In " + days_left + " days"} is_mobile={true} />
              </Col>
            </Row>
            <Row className="mobile-featured-concert-box-row">
              <Col>
                <div className="header-6">{artist_name}</div>
              </Col>
            </Row>
            <Row className="mobile-featured-concert-box-row">
              <Col>
                <div className="subtitle-3">
                  {day} | {date} | {time}
                </div>
              </Col>
            </Row>
            <Row className="featured-concert-box-row">
              <Col>
                <button
                  className="primary-button mobile-button-text mobile-featured-concert-action-button"
                  onClick={() => history.push("/upcoming/" + concert_id)}
                >
                  PEEK INSIDE
              </button>
              </Col>
            </Row>
          </div>
        )
      ) : (
        <Row className="featured-concert-box-row">
          <Col>
            <div className="header-3">Next Show Coming Soon</div>
          </Col>
        </Row>
        // <Row className="featured-concert-box-row">
        //   <Col>
        //     <div className="subtitle-1">
        //       {day} | {date} | {time}
        //     </div>
        //   </Col>
        // </Row>
        // <Row className="featured-concert-box-row">
        //   <Col>
        //     {/* <PrimaryButton
        //       content="PEEK INSIDE"
        //       action={() => history.push("/upcoming/" + concert_id)}
        //     /> */}
        //     <button
        //       className="primary-button button-text featured-concert-action-button"
        //       onClick={() => history.push("/upcoming/" + concert_id)}
        //     >
        //       PEEK INSIDE
        //     </button>
        //   </Col>
        // </Row>)
      )}
    </Grid>
  );
};

export default FeaturedConcertBox;
