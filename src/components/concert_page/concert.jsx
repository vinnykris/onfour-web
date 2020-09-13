// React Imports
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
// Main Imports
//import history from "../../history";

// Function import
import { createUpcomingObject } from "../util";
import { getOneConcert, getArtistInfo } from "../../apis/get_concert_data";
import { fetchUserConcertIDs } from "../../apis/get_user_data";
import { useWindowDimensions } from "../custom_hooks";

// Graphql Imports
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { getCrewsByUsername, getCrewObject } from "../../utils/crew";

// AWS Imports
import { Analytics } from "aws-amplify";
import Auth from "../../apis/UserPool";
import awsmobile from "../../apis/AppSync";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

// Component Imports
import CountdownTimer from "../countdown_timer/countdown_timer";
import SocialBar from "../social_bar/social_bar";
import Tooltip from "@material-ui/core/Tooltip";
import Rodal from "rodal";
import { Grid, Row, Col } from "../grid";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { Checkbox2, useCheckboxState } from "pretty-checkbox-react";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import TicketBox from "../payment/ticket_box";
import CheckoutBox from "../payment/checkout_box";
import PayTicketBox from "../payment/pay_ticket_box";
import InviteCrewModal from "./invite_crew_modal";
import CreateCrewModal from "../user_profile/create_crew_modal";

// Module imports
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { motion, AnimatePresence } from "framer-motion";
// import { withStyles } from "@material-ui/core/styles";
// import { green } from "@material-ui/core/colors";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import CircleChecked from '@material-ui/icons/CheckCircleOutline';
// import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
// import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
// import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";

// EmailJS Import
import emailjs from "emailjs-com";
import { service_id, template_id, user_id } from "../../apis/email_js";

// Google Calendar Import
import ApiCalendar from "../google_calender/google_calendar_api";

// Styling Imports
import "./concert_styles.scss";
import "rodal/lib/rodal.css";
import "react-multi-email/style.css";

// Image imports
import Tag from "../tag";

Amplify.configure(awsmobile); // Configuring AppSync API

// Concert is the unique concert page
const Concert = (props) => {
  const [concert_info, setConcertInfo] = useState(null); // Holds concert-specific info
  const [tooltip_text, setTooltipText] = useState("");
  const [facebook_link, setFacebookLink] = useState("");
  const [twitter_link, setTwitterLink] = useState("");
  const [open_modal, setOpenModal] = useState(false);
  const [backstage_pass, setBackstagePass] = useState(false);
  const [emails, setEmails] = useState([]);
  const [total, setTotal] = useState(0);
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [show_stub, setShowStub] = useState(false);
  const [general_price, setGeneralPrice] = useState(0);
  const [backstage_price, setBackstagePrice] = useState(0);
  const [stub_animation_done, setStubAnimationDone] = useState(false);
  const [general_checked, setGeneralChecked] = useState(true);
  // const [backstage_checked, setBackstageChecked] = useState(false);
  const [has_ticket, setHasTicket] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enter_venue_status, setEnterVenueStatus] = useState(false);
  const [showPaymentBox, setShowPaymentBox] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [calender_added, setCalenderAdded] = useState(false);
  const [calendar_button_clicked, setCalendarBtnClicked] = useState(false);
  const [userCrews, setUserCrews] = useState([]);
  const [showCreateCrewModal, setShowCreateCrewModal] = useState(false);
  const [availableColors, setAvailableColors] = useState([
    "D1AE53",
    "04ADC0",
    "BF8AF4",
    "49BDFE",
    "444DF2",
    "E26A6A",
  ]);

  let location = useLocation();

  var concert_date = null;
  var concert_time = null;

  const { height, width } = useWindowDimensions(); // Dimensions of screen

  var price_map = {
    general: 10,
    backstage: 10,
  };

  // const backstage_checkbox = useCheckboxState();

  // Concert-specific info
  const concert_id = props.match.params.showID; // Passed from URL
  const state = props.location.state; // Props passed through link

  // Auth.currentAuthenticatedUser({})
  //   .then((user) => {
  //     setAuth(true);
  //     setUsername(user.username);
  //     console.log(user.username);
  //   })
  //   .catch((err) => setAuth(false));

  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true); // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: "10px", behavior: "smooth" });
    setScroll(false);
  }

  /**
   * Gets and formats the user crews data and sets them in the local state.
   * @param {string} currentUsername Name of the user to get the crews from
   * @returns {void}
   */
  const getUserCrews = async (currentUsername = username) => {
    if (!currentUsername) return;
    const userCrews = await getCrewsByUsername(currentUsername);

    if (userCrews) {
      const crewsIdArray = Object.keys(userCrews);
      const crewsDataPromises = [];

      crewsIdArray.forEach((crewId) => {
        crewsDataPromises.push(getCrewObject(crewId));
      });

      const crewData = await Promise.all(crewsDataPromises);

      crewData.forEach((crew, crewIndex) => {
        if (!crew) return;
        const crewMembersArray = [];
        const crewMembersEntries = Object.entries(JSON.parse(crew.members));

        crewMembersEntries.forEach((member) => {
          const processedMember = {
            email: member[0],
            username: member[1] || member[0],
            initial: member[1]
              ? member[1][0].toUpperCase()
              : member[0][0].toUpperCase(),
            color:
              availableColors[
                Math.floor(Math.random() * Math.floor(availableColors.length))
              ],
          };

          crewMembersArray.push(processedMember);
        });

        let adminLocation = 0;
        crewMembersArray.forEach((member, memberIndex) => {
          if (member.username === crew.admin) {
            adminLocation = memberIndex;
          }
        });

        if (adminLocation !== 0) {
          const tempMember = crewMembersArray[0];
          crewMembersArray[0] = crewMembersArray[adminLocation];
          crewMembersArray[adminLocation] = tempMember;
        }

        crewData[crewIndex].color = userCrews[crew.id];
        crewData[crewIndex].membersArray = crewMembersArray;
      });

      crewData.forEach((crew, crewIndex) => {
        if (!crew) crewData.splice(crewIndex, 1);
      });

      crewData.sort((crewA, crewB) => {
        if (crewA.name < crewB.name) return -1;
        if (crewA.name > crewB.name) return 1;
        return 0;
      });

      setUserCrews(crewData);
    }
  };

  /**
   * Handles the close of the invite crew modal.
   * @param {boolean} update Determines if the user crews needs to be updated
   * @returns {void}
   */
  const handleCloseModals = (update = false) => {
    if (update === true) getUserCrews();
    setShowInviteModal(false);
    setShowCreateCrewModal(false);
  };

  const fetchUserData = async (name) => {
    // console.log(name);
    const user_concerts = await fetchUserConcertIDs(name);
    // console.log("fetching user data");
    // console.log(user_concerts);
    if (user_concerts && user_concerts.includes(concert_id)) {
      setHasTicket(true);
    }
    await getUserCrews(name);
  };

  // Runs on mount
  useEffect(() => {
    // Check is user is logged in
    // (async () => {
    // console.log("mounting");
    Auth.currentAuthenticatedUser({})
      .then(async (user) => {
        setAuth(true);
        setUsername(user.username);
        setUserEmail(user.email);
        // console.log(user.username);
        await fetchData(user.username);
        setLoading(false);
        // console.log(concert_info);
        // console.log(has_ticket);
      })
      .catch(async (err) => {
        setAuth(false);
        await fetchData(null);
        setLoading(false);
      });
    // })();

    const fetchData = async (name) => {
      await fetchUserData(name);
      if (state) {
        // If data is coming from upcoming show page
        setConcertInfo(state.info);
      } else {
        // If data needs to be loaded from ID in URL
        // Only reached if user does not come from upcoming page
        const fetchConcert = async (id) => {
          const data = await getOneConcert(id);
          const artist_data = await getArtistInfo(data.artist_id);
          setConcertInfo(createUpcomingObject(data, artist_data));
        };
        fetchConcert(concert_id);
      }
      // console.log("fetch data is done");
    };

    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // fetchData();

    setTooltipText("Copy to clipboard");
    setFacebookLink(
      `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.onfour.live%2Fupcoming%2F${concert_id}&amp;src=sdkpreparse`
    );
    setTwitterLink(
      `https://twitter.com/intent/tweet?text=Come%20watch%20a%20concert%20with%20me&url=https%3A%2F%2Fonfour.live%2Fupcoming%2F${concert_id}`
    );
    // setTotal(general_price + backstage_price);
  }, []);

  // Hook run when concert_info is received
  useEffect(() => {
    if (concert_info) {
      price_map.general = concert_info.price;
      setGeneralPrice(concert_info.price);
      setTotal(concert_info.price);
      concert_date = concert_info.date;
      concert_time = concert_info.time;
    }
  }, [concert_info]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (concert_info) {
        const difference =
          new Date(concert_info.date + "T" + concert_info.time + ".000-04:00") -
          +new Date();
        // If less than 30 minutes, user can enter venue!
        if (difference < 1800000) {
          setEnterVenueStatus(true);
          clearInterval(interval);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [concert_info]);

  // If copy to clipboard button is clicked, change tooltip text and copy stream page link
  // Record analytics for click as well
  const copyToClipboard = () => {
    // Analytics.record({ name: "copyClipboardShareClicked" });
    navigator.clipboard.writeText(window.location.href);
    setTooltipText("Copied!");
  };

  // Opens payment modal when user tries to get ticket from concert page
  const getTicket = () => {
    setOpenModal(true);
  };

  // Hides payment modal
  const hideModal = () => {
    setOpenModal(false);
  };

  // Go to checkout page for paid concert
  const goToCheckout = () => {
    // console.log("go to checkout");
    // console.log(total);
    setShowPaymentBox(true);
  };

  const goBackToModal = () => {
    setShowPaymentBox(false);
  };

  // Sends emails to invited users
  const sendEmailInvites = (user_name) => {
    for (let i = 0; i < emails.length; i++) {
      const template_params = {
        email_receipient: emails[i],
        reply_to: "onfour.box@gmail.com",
        friend_name: user_name,
        musician: concert_info.artist_name,
        date: concert_info.week_day.concat(
          ", ",
          concert_info.formatted_date,
          " @ ",
          concert_info.formatted_time
        ),
        buy_or_rsvp: "RSVP",
        concert_link: "https://www.onfour.live/upcoming/".concat(concert_id),
      };
      setTimeout(() => {
        emailjs.send(service_id, template_id, template_params, user_id);
      }, 1000);
    }
  };

  // Function called when user purchases/obtains ticket from modal
  // First adds ticket to user's profile in database
  // Then hides the modal and shows the ticket stub
  // Calls function that sends emails to invited users
  const addTicket = async () => {
    const user_data = await API.graphql(
      graphqlOperation(queries.get_user_data, {
        input: username,
      })
    );

    const current_concert_data =
      user_data.data.getCreateOnfourRegistration.concert;

    const user_name = user_data.data.getCreateOnfourRegistration.first;

    if (!current_concert_data || !isNaN(parseInt(current_concert_data))) {
      var concert_data = {};
    } else {
      var concert_data = JSON.parse(current_concert_data);
    }

    concert_data[concert_id] = true;

    const payload = {
      username,
      concert: JSON.stringify(concert_data),
    };

    API.graphql(
      graphqlOperation(mutations.update_user, {
        input: payload,
      })
    );
    hideModal();
    setShowStub(true);
    setHasTicket(true);
    sendEmailInvites(user_name);
  };

  // Shows the calendar button
  // Called after the animation is done
  const showCalendarButton = () => {
    if (document.getElementById("add-to-calendar")) {
      document.getElementById("add-to-calendar").style.visibility = "visible";
    }
    // After 8 seconds, end the stub animation and go back to the concert page
    // setTimeout(() => {
    //   if (!stub_animation_done) animationEnd();
    // }, 8000);
  };

  // Animated the ticket stub leaving the screen and hides the calendar button
  const animationEnd = () => {
    if (!stub_animation_done) {
      if (document.getElementById("add-to-calendar")) {
        document.getElementById("add-to-calendar").style.visibility = "hidden";
      }
      if (document.getElementById("calendar-redirect-msg")) {
        document.getElementById("calendar-redirect-msg").style.visibility =
          "hidden";
      }
      setStubAnimationDone(true);
      // Go back to the concert page after half a second
      setTimeout(() => {
        setShowStub(false);
      }, 500);
    }
  };

  // Function to add event element to calendar
  // Ends animation
  const addToCalendar = async () => {
    setCalendarBtnClicked(true);
    await ApiCalendar.handleAuthClick();
    await addEvent();
  };

  const handleGeneralClicked = () => {
    setGeneralChecked(true);
  };

  // const handleBackstageClicked = () => {
  //   setBackstageChecked(!backstage_checked);
  // };
  const addEvent = async () => {
    const eventLoad = {
      summary:
        concert_info.artist_name +
        " - " +
        concert_info.concert_name +
        "(concert)",
      description: "onfour concert!",
      start: {
        dateTime: new Date(
          concert_info.date + "T" + concert_info.time + ".000-04:00"
        ).toISOString(),
      },
      reminders: {
        overrides: {
          minutes: 30,
        },
      },
      end: {
        dateTime: new Date(
          new Date(
            concert_info.date + "T" + concert_info.time + ".000-04:00"
          ).getTime() +
            90 * 60000
        ).toISOString(),
      },
      colorId: 5,
    };
    await ApiCalendar.createEvent(eventLoad)
      .then((result) => {
        if (result.status === 200) {
          setCalenderAdded(true);
          setCalendarBtnClicked(false);
          // console.log(concert_info.date);
          // animationEnd();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goToVenue = () => {
    console.log("take me to the venue pls");
  };

  return (
    <div className="concert-page">
      {width <= 600 ? (
        <div className="mobile-concert-page">
          {show_stub && concert_info ? (
            <span className="stub-background">
              <ClickAwayListener onClickAway={animationEnd}>
                <div className="centered-stub-container">
                  <AnimatePresence>
                    {!stub_animation_done ? (
                      <div>
                        <motion.img
                          src={concert_info.stub_url}
                          initial={{ y: 600 }}
                          animate={{ y: 0 }}
                          exit={{ y: 600 }}
                          onAnimationComplete={showCalendarButton}
                          className="ticket-stub-img"
                        />
                        <div className="calendar-button">
                          {calender_added ? (
                            <p
                              className="calendar-redirect-msg"
                              id="calendar-redirect-msg"
                            >
                              We've got you covered! Check your{" "}
                              <a
                                className="google-calendar-link-text calendar-redirect-msg"
                                href={
                                  "https://calendar.google.com/calendar/b/0/r/week/" +
                                  concert_info.date.replace(/-/gi, "/")
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Google Calendar
                              </a>{" "}
                              for a surprise.
                            </p>
                          ) : calendar_button_clicked ? (
                            <div className="moonloader-container">
                              <MoonLoader
                                sizeUnit={"px"}
                                size={30}
                                color={"white"}
                                loading={!calender_added}
                              />
                            </div>
                          ) : (
                            <button
                              id="add-to-calendar"
                              className="add-calendar-button segmented-button-text add-to-calendar"
                              onClick={addToCalendar}
                            >
                              + Add to Calendar
                            </button>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </ClickAwayListener>
            </span>
          ) : null}
          {!concert_info ? (
            <div className="overlay-box">
              <ScaleLoader
                sizeUnit={"px"}
                size={18}
                color={"#E465A2"}
                loading={loading}
              />
            </div>
          ) : (
            <Grid>
              <Rodal
                visible={open_modal}
                onClose={hideModal}
                width={100}
                height={100}
                measure="%"
                customStyles={{
                  padding: 0,
                  overflow: scroll,
                  maxHeight: "620px",
                  maxWidth: "482px",
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #07070F",
                  boxShadow:
                    "0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                }}
                className="rodal-custom"
              >
                {showPaymentBox ? (
                  <PayTicketBox
                    general_price={general_price}
                    backstage_price={backstage_price}
                    // backstage_price = {10}
                    // general_price = {1}
                    total={total}
                    goBackToModal={goBackToModal}
                    addTicket={addTicket}
                  ></PayTicketBox>
                ) : (
                  <CheckoutBox
                    username={username}
                    location={location}
                    artist_name={concert_info.artist_name}
                    concert_name={concert_info.concert_name}
                    concert_full_time={
                      concert_info.week_day +
                      ", " +
                      concert_info.formatted_date +
                      ", " +
                      concert_info.formatted_time
                    }
                    general_price={general_price}
                    backstage_price={backstage_price}
                    goToCheckout={goToCheckout}
                    // backstage_price = {10}
                    // general_price = {1}
                    addTicket={addTicket}
                    setTotal={setTotal}
                    total={total}
                  ></CheckoutBox>
                )}
                {/* <div className="invite-friends">
                          <Row>
                            <Col size={1}>
                              <span className="invite-prompt">
                                <span className="fa-stack">
                                  <i className="fa fa-circle fa-stack-2x icon-background"></i>
                                  <i
                                    className="fa fa-stack-1x fa-user-plus add-user-icon"
                                    aria-hidden="true"
                                  ></i>
                                </span>

                                <p className="invite-text">
                                  Invite Your Friends
                                </p>
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col size={1}>
                              <div className="email-input-field">
                                {" "}
                                <ReactMultiEmail
                                  placeholder="Please separate emails with commas"
                                  style={{ background: "#EEEEEE" }}
                                  emails={emails}
                                  onChange={(_emails) => {
                                    setEmails(_emails);
                                  }}
                                  validateEmail={(email) => {
                                    return isEmail(email) && emails.length < 10; // return boolean
                                  }}
                                  getLabel={(email, index, removeEmail) => {
                                    return (
                                      <div data-tag key={index}>
                                        {email}
                                        <span
                                          data-tag-handle
                                          onClick={() => removeEmail(index)}
                                        >
                                          ×
                                        </span>
                                      </div>
                                    );
                                  }}
                                />
                              </div>
                              <div>
                                {emails.length >= 10 ? (
                                  <p className="emails-warning">
                                    You have reached the maximum number of
                                    invites!
                                  </p>
                                ) : (
                                  <p className="emails-warning backstage-hidden-text">
                                    Input validated
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </div> */}
              </Rodal>
              <div className="mobile-concert-image-wrapper">
                <img
                  src={concert_info.img}
                  className="concert-page-featured-mobile"
                  alt="concert-poster"
                />
                <div className="concert-page-overlay-mobile" />
              </div>
              <div className="concert-details-section-mobile">
                <Row className="timer-row-mobile">
                  <div className="countdown-timer">
                    <CountdownTimer
                      start_date={concert_info.date}
                      start_time={concert_info.time}
                      className="header-3 countdown-timer-number concert-timer-color-mobile "
                    />
                  </div>
                </Row>
                <Row style={{ marginBottom: "21px" }}>
                  <Col size={1}>
                    {has_ticket ? (
                      <div>
                        {enter_venue_status ? (
                          <NavLink to="/stream">
                            {" "}
                            <button
                              className="primary-button button-text full-width-button"
                              // onClick={goToVenue}
                            >
                              Enter Venue
                            </button>
                          </NavLink>
                        ) : (
                          <Tooltip title="Please try again 30 minutes before the show!">
                            <button className="button-text disabled-venue-button">
                              Enter Venue
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    ) : (
                      <button
                        className="primary-button button-text full-width-button"
                        onClick={getTicket}
                      >
                        {total > 0 ? "BUY TICKETS" : "RSVP"}
                      </button>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className="no-stretch-column">
                    <text className="header-4 concert-header-color-mobile">
                      {concert_info.artist_name.toUpperCase()} –{" "}
                      {concert_info.concert_name.toUpperCase()}
                    </text>
                  </Col>
                </Row>
                <Row className="concert-details-spacing-mobile">
                  <Col className="no-stretch-column">
                    <span className="header-10 concert-timing-color-mobile">
                      {concert_info.week_day} | {concert_info.formatted_date} |{" "}
                      {concert_info.formatted_time}
                    </span>
                  </Col>
                </Row>
                <Row className="concert-details-spacing-mobile">
                  <text className="header-10 concert-suggestion-color-mobile">
                    * Tune in to the concert on your desktop to enjoy video chat
                    experience
                  </text>
                </Row>
                <Row className="concert-details-spacing-mobile">
                  <Col className="no-stretch-column">
                    <p className="body-3 concert-description-color-mobile">
                      {concert_info.description}
                    </p>
                  </Col>
                </Row>
                <Row className="share-section-mobile">
                  <text className="header-9 share-text-mobile">Share:</text>
                  <div>
                    <ul className="social-list">
                      <li>
                        <a
                          onClick={() =>
                            Analytics.record({
                              name: "facebookShareClicked",
                            })
                          }
                          href={facebook_link}
                          className="fab fa-facebook fb-xfbml-parse-ignore"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Facebook Link</span>
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            Analytics.record({
                              name: "twitterShareClicked",
                            })
                          }
                          className="fa fa-twitter twitter-share-button"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={twitter_link}
                          data-text="Come watch a concert with me!"
                          data-url={window.location.href}
                          data-lang="en"
                          data-show-count="false"
                        >
                          <span>Twitter Link</span>
                        </a>
                        <script
                          async
                          src="https://platform.twitter.com/widgets.js"
                          charSet="utf-8"
                        ></script>
                      </li>
                      <li>
                        <Tooltip title={tooltip_text}>
                          <span onClick={copyToClipboard}>
                            <i className="fa fa-clone">
                              <span>Copy Link</span>
                            </i>
                          </span>
                        </Tooltip>
                      </li>
                    </ul>
                  </div>
                </Row>
              </div>
            </Grid>
          )}
        </div>
      ) : (
        <div className="desktop-concert-page">
          {show_stub && concert_info ? (
            <span className="stub-background">
              <ClickAwayListener onClickAway={animationEnd}>
                <div className="centered-stub-container">
                  <AnimatePresence>
                    {!stub_animation_done ? (
                      <div>
                        <motion.img
                          src={concert_info.stub_url}
                          initial={{ y: 1000 }}
                          animate={{ y: 0 }}
                          exit={{ y: 1000 }}
                          onAnimationComplete={showCalendarButton}
                          className="ticket-stub-img"
                        />
                        <div className="calendar-button">
                          {calender_added ? (
                            <p
                              className="calendar-redirect-msg"
                              id="calendar-redirect-msg"
                            >
                              We've got you covered! Check your{" "}
                              <a
                                className="google-calendar-link-text calendar-redirect-msg"
                                href={
                                  "https://calendar.google.com/calendar/b/0/r/week/" +
                                  concert_info.date.replace(/-/gi, "/")
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Google Calendar
                              </a>{" "}
                              for a surprise.
                            </p>
                          ) : calendar_button_clicked ? (
                            <div className="moonloader-container">
                              <MoonLoader
                                sizeUnit={"px"}
                                size={30}
                                color={"white"}
                                loading={!calender_added}
                              />
                            </div>
                          ) : (
                            <button
                              id="add-to-calendar"
                              className="add-calendar-button segmented-button-text add-to-calendar"
                              onClick={addToCalendar}
                            >
                              + Add to Calendar
                            </button>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </ClickAwayListener>
            </span>
          ) : null}
          {!concert_info ? (
            <div className="overlay-box">
              <ScaleLoader
                sizeUnit={"px"}
                size={18}
                color={"#E465A2"}
                loading={!concert_info}
              />
            </div>
          ) : (
            <Grid>
              <Rodal
                visible={open_modal}
                onClose={hideModal}
                width={50}
                height={96}
                measure="%"
                customStyles={{
                  padding: 0,
                  overflow: scroll,
                  maxHeight: "620px",
                  maxWidth: "482px",
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #07070F",
                  boxShadow:
                    "0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                }}
                className="rodal-custom"
              >
                {showPaymentBox ? (
                  <PayTicketBox
                    general_price={general_price}
                    backstage_price={backstage_price}
                    // backstage_price = {10}
                    // general_price = {1}
                    total={total}
                    goBackToModal={goBackToModal}
                    addTicket={addTicket}
                  ></PayTicketBox>
                ) : (
                  <CheckoutBox
                    username={username}
                    location={location}
                    artist_name={concert_info.artist_name}
                    concert_name={concert_info.concert_name}
                    concert_full_time={
                      concert_info.week_day +
                      ", " +
                      concert_info.formatted_date +
                      ", " +
                      concert_info.formatted_time
                    }
                    general_price={general_price}
                    backstage_price={backstage_price}
                    goToCheckout={goToCheckout}
                    // backstage_price = {10}
                    // general_price = {1}
                    addTicket={addTicket}
                    setTotal={setTotal}
                    total={total}
                  ></CheckoutBox>
                )}
              </Rodal>
              <div className="banner-container">
                <img
                  src={concert_info.img}
                  className="concert-page-featured"
                  alt="concert-poster"
                />
                <div className="concert-page-overlay" />
              </div>
              <div className="countdown-box">
                <div className="countdown-inner">
                  {" "}
                  <CountdownTimer
                    start_date={concert_info.date}
                    start_time={concert_info.time}
                    className="header-1 countdown-timer-number"
                  />
                </div>
              </div>
              <div className="concert-info">
                <div className="tag-calendar">
                  <div className="tag-container concert-tag">
                    <Tag content={"In " + concert_info.days_left + " days"} />
                  </div>
                  {calender_added ? (
                    <p className="segmented-button-text no-padding">
                      Added to your{" "}
                      <a
                        className="google-calendar-link-text segmented-button-text"
                        href={
                          "https://calendar.google.com/calendar/b/0/r/week/" +
                          concert_info.date.replace(/-/gi, "/")
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Calendar
                      </a>{" "}
                    </p>
                  ) : calendar_button_clicked ? (
                    <div className="left-padding-20">
                      <MoonLoader
                        sizeUnit={"px"}
                        size={18}
                        color={"white"}
                        loading={!calender_added}
                      />
                    </div>
                  ) : (
                    <span
                      className="secondary-button segmented-button-text add-to-calendar"
                      onClick={addToCalendar}
                    >
                      + Add to calendar
                    </span>
                  )}
                  {/* <div className="share-concert-container">
                      <Col size={1}>
                        <div>
                          <h5 className="share-concert-text">
                            Share With Friends
                          </h5>
                        </div>
                        <div className="share-list-container">
                          <ul className="social-list">
                            <li>
                              <a
                                onClick={() =>
                                  Analytics.record({
                                    name: "facebookShareClicked",
                                  })
                                }
                                href={facebook_link}
                                className="fa fa-facebook-official fb-xfbml-parse-ignore"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>Facebook Link</span>
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  Analytics.record({
                                    name: "twitterShareClicked",
                                  })
                                }
                                className="fa fa-twitter twitter-share-button"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={twitter_link}
                                data-text="Come watch a concert with me!"
                                data-url={window.location.href}
                                data-lang="en"
                                data-show-count="false"
                              >
                                <span>Twitter Link</span>
                              </a>
                              <script
                                async
                                src="https://platform.twitter.com/widgets.js"
                                charSet="utf-8"
                              ></script>
                            </li>
                            <li>
                              <Tooltip title={tooltip_text}>
                                <span onClick={copyToClipboard}>
                                  <i className="fa fa-clone">
                                    <span>Copy Link</span>
                                  </i>
                                </span>
                              </Tooltip>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </div> */}
                </div>
                <div className="concert-info-inner">
                  <div className="concert-main-info">
                    <div>
                      <h3 className="header-3 titles">
                        {concert_info.artist_name.toUpperCase()} –{" "}
                        {concert_info.concert_name.toUpperCase()}
                      </h3>
                    </div>
                    <div>
                      <p className="body-1 artist-description-text">
                        {concert_info.description}
                      </p>
                    </div>
                  </div>
                  <div className="concert-logistics">
                    <Row>
                      {/* <div className="buy-ticket"> */}
                      {has_ticket ? (
                        <div className="button-container">
                          {enter_venue_status ? (
                            <NavLink to="/stream">
                              {" "}
                              <button className="primary-button concert-ticket-button">
                                <span className="button-text concert-button-text">
                                  Enter Venue
                                </span>
                              </button>
                            </NavLink>
                          ) : (
                            <Tooltip title="Please try again 30 minutes before the show!">
                              <button
                                className="primary-button concert-ticket-button"
                                disabled
                              >
                                <span className="button-text concert-button-text">
                                  Enter Venue
                                </span>
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      ) : (
                        <button
                          className="primary-button concert-ticket-button"
                          onClick={getTicket}
                        >
                          {total > 0 ? (
                            <span className="button-text concert-button-text">
                              Buy Tickets
                            </span>
                          ) : (
                            <span className="button-text concert-button-text">
                              RSVP
                            </span>
                          )}
                        </button>
                      )}
                      {/* </div> */}
                    </Row>
                    {has_ticket && (
                      <Row>
                        <div className="button-container">
                          {userCrews.length > 0 ? (
                            <button
                              className="primary-button invite-crew-button"
                              onClick={() => setShowInviteModal(true)}
                            >
                              <span className="button-text invite-button-text">
                                Invite Crew
                              </span>
                            </button>
                          ) : (
                            <button
                              className="primary-button invite-crew-button"
                              onClick={() => setShowCreateCrewModal(true)}
                            >
                              <span className="button-text invite-button-text">
                                Create a Crew
                              </span>
                            </button>
                          )}
                        </div>
                      </Row>
                    )}
                    <Row className="logistics-top">
                      <span className="header-6">
                        {concert_info.week_day}, {concert_info.formatted_date}
                      </span>
                    </Row>
                    <hr className="solid" />
                    <Row>
                      <span className="header-6">
                        {concert_info.formatted_time} EST
                      </span>
                    </Row>
                    <hr className="solid" />
                    <Row>
                      <span className="header-6">
                        Streamed from {concert_info.location}
                      </span>
                    </Row>
                    <hr className="solid" />
                    <SocialBar
                      instagram={concert_info.instagram}
                      spotify={concert_info.spotify}
                      youtube={concert_info.youtube}
                      facebook={concert_info.facebook}
                      twitter={concert_info.twitter}
                    />
                  </div>
                </div>
                <div className="share-concert">
                  <div>
                    <span className="segmented-button-text share-concert-text">
                      Share With Friends
                    </span>
                  </div>
                  <div className="share-list-container">
                    <ul className="social-list">
                      <li>
                        <a
                          onClick={() =>
                            Analytics.record({
                              name: "facebookShareClicked",
                            })
                          }
                          href={facebook_link}
                          className="fab fa-facebook fb-xfbml-parse-ignore"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Facebook Link</span>
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            Analytics.record({
                              name: "twitterShareClicked",
                            })
                          }
                          className="fa fa-twitter twitter-share-button"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={twitter_link}
                          data-text="Come watch a concert with me!"
                          data-url={window.location.href}
                          data-lang="en"
                          data-show-count="false"
                        >
                          <span>Twitter Link</span>
                        </a>
                        <script
                          async
                          src="https://platform.twitter.com/widgets.js"
                          charSet="utf-8"
                        ></script>
                      </li>
                      <li>
                        <Tooltip title={tooltip_text}>
                          <span onClick={copyToClipboard}>
                            <i className="fa fa-clone">
                              <span>Copy Link</span>
                            </i>
                          </span>
                        </Tooltip>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Grid>
          )}
        </div>
      )}

      <InviteCrewModal
        showModal={showInviteModal}
        userCrews={userCrews}
        handleClose={handleCloseModals}
        username={username}
        userEmail={userEmail}
        updateCrews={getUserCrews}
      />
      <CreateCrewModal
        showCrewModal={showCreateCrewModal}
        closeModal={handleCloseModals}
        currentUsername={username}
        currentUserEmail={userEmail}
      />
    </div>
  );
};

export default Concert;
