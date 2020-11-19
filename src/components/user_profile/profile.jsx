import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useHistory } from "react-router-dom";

import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";

import EditProfile from "./edit_profile_page";
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
import profileIcon from "../../images/icons/wallet_24px.png";

// Query Params
import queryString from "query-string";

// Utils
import {
  determineUsername,
  determineEmail,
  determinePreferredUsername,
} from "../../utils/register";

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
  const [preferred_username, setPreferredUsername] = useState("");
  const [hide_original_username, setHideOriginalUsername] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        setAuth(true);
        determineUsername(user).then((username) => setUsername(username));
        determineEmail(user).then((email) => setUserEmail(email));
        determinePreferredUsername(user).then((preferred_username) => {
          setPreferredUsername(preferred_username);
          if (preferred_username) setHideOriginalUsername(true);
        });
      })
      .catch((err) => {
        setAuth(false);
        const pre_signup_failure = queryString.parse(window.location.search)
          .error_description;
        if (
          pre_signup_failure &&
          pre_signup_failure.includes(
            "A user with the same email address exists"
          )
        )
          history.push({
            pathname: "/register",
            search: "?error_code=duplicate_email",
          });
        else history.push("/");
      });
  }, []);

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


  const goToTicket = () => {
    setCurrentPage("ticketstub");
    if (
      document.getElementById("dashboard-icon") &&
      document.getElementById("ticket-icon") &&
      document.getElementById("profile-icon")
    ) {
      document.getElementById("dashboard-icon").style.opacity = 0.5;
      document.getElementById("ticket-icon").style.opacity = 1;
      document.getElementById("profile-icon").style.opacity = 0.5;
    }
  };

  const goToDashboard = () => {
    setCurrentPage("dashboard");
    if (
      document.getElementById("dashboard-icon") &&
      document.getElementById("ticket-icon") &&
      document.getElementById("profile-icon")
    ) {
      document.getElementById("dashboard-icon").style.opacity = 1;
      document.getElementById("ticket-icon").style.opacity = 0.5;
      document.getElementById("profile-icon").style.opacity = 0.5;
    }
  };
  const editprofilepage = () => {
    setCurrentPage("EditProfile");
    if (
      document.getElementById("dashboard-icon") &&
      document.getElementById("ticket-icon") &&
      document.getElementById("profile-icon")
    ) {
      document.getElementById("dashboard-icon").style.opacity = 0.5;
      document.getElementById("ticket-icon").style.opacity = 0.5;
      document.getElementById("profile-icon").style.opacity = 1;
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
                    className="profile-dashboard-icon initial-highlight"
                    id="ticket-icon"
                    onClick={goToTicket}
                  ></img>
                </Row>
                <Row>
                  <img
                    src={profileIcon}
                    className="profile-dashboard-icon initial-highlight"
                    id="profile-icon"
                    onClick={editprofilepage}
                  ></img>
                </Row>
              </div>
              
            </Col>
            {(() => {
              if (currentPage == "dashboard") {
                return (
                  <DashboardPage
                    width={width}
                    upcoming_concerts={upcoming_concerts}
                    memories={memories}
                    history={history}
                    username={username}
                    userEmail={userEmail}
                  ></DashboardPage>
                );
              }
              if (currentPage == "EditProfile") {
                return (
                  <EditProfile
                    username={username}
                    userEmail={userEmail}
                    preferred_username={preferred_username}
                    hide_original_username={hide_original_username}
                    setPreferredUsername={setPreferredUsername}
                    setHideOriginalUsername={setHideOriginalUsername}
                    width={width}
                  ></EditProfile>
                );
              } else {
                return (
                  <TicketPage
                    stubs={stubs}
                    width={width}
                    history={history}
                  ></TicketPage>
                );
              }
            })()}

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
