import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";
import FlexibleGrid from "../flexible_grid/flexible_grid";

import ProfileStub from "./profile_stub";
import Carousel from "react-multi-carousel";
import StubSlider from "./stub_slider";

// API Imports
import {
  getUpcomingPurchasedShows,
  getMemories,
  getMostRecentUpcomingInfo,
} from "../../apis/get_user_data";

import "./profile_styles.scss";
import "react-multi-carousel/lib/styles.css";

const Profile = (props) => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  const variables = props.location.state;
  const [upcoming_concerts, setUpcomingConcerts] = useState([]);
  const [memories, setMemories] = useState([]);
  const [stubs, setStubs] = useState([]);
  const [is_loaded, setIsLoaded] = useState(false);

  const getStubs = (concerts) => {
    var stub_urls = [];
    concerts.forEach((concert) => {
      //console.log(concert.props.stub_url);
      stub_urls.push(
        <ProfileStub
          img={concert.props.stub_url}
          className="profile-stub-component"
        />
      );
    });
    return stub_urls;
  };

  useEffect(() => {
    const fetchData = async () => {
      // RSVP'd Upcoming shows
      const upcoming_result = await getUpcomingPurchasedShows(
        width,
        variables.username
      );
      console.log(upcoming_result);
      setUpcomingConcerts(upcoming_result.slice(0, 5));
      // setStubs(getStubs);
      setStubs(getStubs(upcoming_result));

      // Archive videos (sorting from most recent -> oldest)
      const memories_result = await getMemories(variables.username);
      await setMemories(
        memories_result
          .sort(
            (a, b) =>
              new Date(b.props.concert_date) - new Date(a.props.concert_date)
          )
          .slice(0, 4)
      );
      await setIsLoaded(true);
    };
    fetchData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="profile-page">
      {is_loaded ? (
        <Grid>
          <Row className="profile-section header-section">
            <div className="header-grid">
              <div className="user-icon-container">
                <img
                  className="profile-user-icon"
                  src="https://onfour-media.s3.amazonaws.com/website+component/account_circle_24pxicon.png"
                ></img>
                <h4 className="profile-preview-content-header username-header">
                  Hello, {variables.name}!
                </h4>
              </div>
              <h4 className="profile-preview-content-header dashboard-header">
                Dashboard
              </h4>
              {/* <h4 className="profile-preview-content-header perform-header">I want to perform</h4> */}
            </div>
          </Row>
          <Row className="profile-section">
            <Col className="profile-column" size={1}>
              <Row>
                <Col size={1}>
                  <h4 className="profile-preview-content-header">
                    UPCOMING SHOWS
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <FlexibleGrid content_list={upcoming_concerts} num_cols={5} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="profile-section">
            <Col className="profile-column" size={1}>
              <Row>
                <Col size={1}>
                  <h4 className="profile-preview-content-header">
                    MY MEMORIES
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col size={1} className="stubs-column">
                  {/* <FlexibleGrid content_list={stubs} num_cols={4} /> */}
                  <StubSlider stubs={stubs} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="profile-section">
            <Col className="profile-column" size={1}>
              <h4 className="profile-preview-content-header">MY CREWS</h4>
            </Col>
          </Row>
        </Grid>
      ) : (
        <div className="overlay-box">
          <PulseLoader
            sizeUnit={"px"}
            size={18}
            color={"#7b6dac"}
            loading={!is_loaded}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
