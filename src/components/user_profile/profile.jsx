import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useHistory } from "react-router-dom";

import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";
import FlexibleGrid from "../flexible_grid/flexible_grid";

// import ProfileStub from "./profile_stub";
// import Carousel from "react-multi-carousel";
// import StubSlider from "./stub_slider";

import DashboardPage from "./dashboard_page";
import TicketPage from "./ticket_page";

import Auth from "../../apis/UserPool";

// API Imports
import {
  getUpcomingPurchasedShows,
  // getMemories,
  // getMostRecentUpcomingInfo,
} from "../../apis/get_user_data";

// Images Imports
import dashboardIcon from "../../images/icons/chrome_reader_mode_24px_outlined.png";
import ticketIcon from "../../images/icons/local_activity_24px_outlined.png";

import "./profile_styles.scss";
import "react-multi-carousel/lib/styles.css";

const Profile = (props) => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  const variables = props.location.state;
  const [upcoming_concerts, setUpcomingConcerts] = useState([]);
  const [memories, setMemories] = useState([]);
  const [stubs, setStubs] = useState([]);
  const [is_loaded, setIsLoaded] = useState(false);
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser({})
      .then((user) => {
        setAuth(true);
        setUsername(user.username);
        setUserEmail(user.attributes.email);
      })
      .catch((err) => {
        setAuth(false);
        history.push("/");
      });
  }, []);

  // const getStubs = (concerts) => {
  //   var stub_urls = [];
  //   concerts.forEach((concert) => {
  //     stub_urls.push(
  //       <ProfileStub
  //         img={concert.props.stub_url}
  //         className="profile-stub-component"
  //       />
  //     );
  //   });
  //   return stub_urls;
  // };

  useEffect(() => {
    // console.log(variables);
    const fetchData = async () => {
      // RSVP'd Upcoming shows
      const results = await getUpcomingPurchasedShows(width, username);
      // console.log(results);
      const upcoming_result = results[0];
      const memories_result = results[1];
      const ticket_stubs = results[2];
      setUpcomingConcerts(upcoming_result);
      // setStubs(getStubs);
      setStubs(ticket_stubs);
      // Archive videos (sorting from most recent -> oldest)
      // const memories_result = await getMemories(variables.username);
      setMemories(memories_result);
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 600 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 600, min: 0 },
  //     items: 1,
  //   },
  // };

  const goToTicket = () => {
    setCurrentPage("ticketstub");
    if (
      document.getElementById("dashboard-icon") &&
      document.getElementById("ticket-icon")
    ) {
      document.getElementById("dashboard-icon").style.opacity = 0.5;
      document.getElementById("ticket-icon").style.opacity = 1;
    }
  };

  const goToDashboard = () => {
    setCurrentPage("dashboard");
    if (
      document.getElementById("dashboard-icon") &&
      document.getElementById("ticket-icon")
    ) {
      document.getElementById("dashboard-icon").style.opacity = 1;
      document.getElementById("ticket-icon").style.opacity = 0.5;
    }
  };

  return (
    <div className="profile-page">
      {is_loaded ? (
        <Grid>
          <Row>
            <Col className="profile-button-col">
              <div className="profile-button-bar">
                <Row>
                  <img
                    src={dashboardIcon}
                    className="profile-dashboard-icon initial-highlight"
                    id="dashboard-icon"
                    onClick={goToDashboard}
                  ></img>
                </Row>
                <Row>
                  <img
                    src={ticketIcon}
                    className="profile-dashboard-icon"
                    id="ticket-icon"
                    onClick={goToTicket}
                  ></img>
                </Row>
              </div>
            </Col>
            {currentPage === "dashboard" ? (
              <DashboardPage
                width={width}
                upcoming_concerts={upcoming_concerts}
                memories={memories}
                history={history}
                username={username}
                userEmail={userEmail}
              ></DashboardPage>
            ) : (
              <TicketPage
                stubs={stubs}
                width={width}
                history={history}
              ></TicketPage>
            )}

            {/* <Col size={7}>
            <Row className="header-section">
                <img src={dashboardIcon} className="profile-header-icon"></img>
                <h4 className="profile-preview-content-header username-header">
                  Dashboard
                </h4>
                <h4 className="profile-preview-content-header dashboard-header">
                  Dashboard
                </h4>
                <h4 className="profile-preview-content-header perform-header">I want to perform</h4>
            </Row>
            <Row className="profile-section">
              <Col className="profile-column" size={1}>
                {upcoming_concerts.length > 0 ? (
                  <div>
                    <Row>
                      <Col size={1}>
                        <h4 className="profile-preview-content-header">
                          UPCOMING SHOWS
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={1}>
                        {width <= 600 ? (
                          <FlexibleGrid content_list={upcoming_concerts} num_cols={1} />
                        ) : (
                            <div>
                              {width < 1280 ? (
                                <div>
                                  {width <= 768 ? (
                                    <FlexibleGrid
                                      content_list={upcoming_concerts}
                                      num_cols={3}
                                    />
                                  ) : (
                                      <FlexibleGrid
                                        content_list={upcoming_concerts}
                                        num_cols={4}
                                      />
                                    )}
                                </div>
                              ) : (
                                    <FlexibleGrid
                                      content_list={upcoming_concerts}
                                      num_cols={5}
                                    />
                                )}
                            </div>
                          )}
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div className="profile-empty-state">
                    <h4 className="empty-state-message">
                      Oops... it looks like you aren't going to any upcoming
                      shows.
                    </h4>
                    <h5 className="empty-state-message">
                      Get your next ticket to a show below!
                    </h5>
                    <button
                      className="upcoming-prompt-button"
                      onClick={() => history.push("/upcoming")}
                    >
                      View Upcoming Shows
                    </button>
                  </div>
                )}
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
          </Col> */}
          </Row>
        </Grid>
      ) : (
        <div className="overlay-box">
          <ScaleLoader
            sizeUnit={"px"}
            size={18}
            color={"#E465A2"}
            loading={!is_loaded}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
