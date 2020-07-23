// React Imports
import React, { useState } from "react";
import { useEffect } from "react";

// Function import
import { createUpcomingObject } from "../util";
import { getOneConcert, getArtistInfo } from "../../apis/get_concert_data";

// Graphql Imports
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

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
import PulseLoader from "react-spinners/PulseLoader";
import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import { ReactMultiEmail, isEmail } from "react-multi-email";

// Module imports
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { motion, AnimatePresence } from "framer-motion";

// EmailJS Import
import emailjs from "emailjs-com";
import { service_id, template_id, user_id } from "../../apis/email_js";

// Google Calendar Import
import ApiCalendar from '../google_calender/google_calendar_api';

// Styling Imports
import "./concert_styles.scss";
import "rodal/lib/rodal.css";
import "react-multi-email/style.css";

// Image imports
import samar_mehdi_ticket from "../../images/tickets/samar_mehdi_ticket.png";

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
  const [show_stub, setShowStub] = useState(false);
  const [general_price, setGeneralPrice] = useState(0);
  const [backstage_price, setBackstagePrice] = useState(0);
  const [stub_animation_done, setStubAnimationDone] = useState(false);

  var price_map = {
    general: 10,
    backstage: 10,
  };

  const backstage_checkbox = useCheckboxState();

  // Concert-specific info
  const concert_id = props.match.params.showID; // Passed from URL
  const state = props.location.state; // Props passed through link

  Auth.currentAuthenticatedUser({})
    .then((user) => {
      setAuth(true);
      setUsername(user.username);
    })
    .catch((err) => setAuth(false));

  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true); // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: "10px", behavior: "smooth" });
    setScroll(false);
  }

  const showTicketStub = () => {
    setShowStub(true);
  };

  // Runs on mount
  useEffect(() => {
    if (state) {
      // If data is coming from upcoming show page
      setConcertInfo(state.info);
      console.log(state.info);
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
    setTooltipText("Copy to clipboard");
    setFacebookLink(
      `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.onfour.live%2Fupcoming%2F${concert_id}&amp;src=sdkpreparse`
    );
    setTwitterLink(
      `https://twitter.com/intent/tweet?text=Come%20watch%20a%20concert%20with%20me&url=https%3A%2F%2Fonfour.live%2Fupcoming%2F${concert_id}`
    );
    setTotal(general_price + backstage_price);
  }, []);

  //
  useEffect(() => {
    if (concert_info) {
      console.log(concert_info);
      price_map.general = concert_info.price;
      setGeneralPrice(concert_info.price);
    }
  }, [concert_info]);

  // Hook called when price updates or when user selects backstage pass
  useEffect(() => {
    if (backstage_checkbox.state) {
      // WHAT HAPPENS IF BACKSTAGE CHECKBOX IS CHECKED
      setTotal(general_price + backstage_price);
      setBackstagePass(true);
    } else {
      setTotal(general_price);
      setBackstagePass(false);
    }
  }, [general_price, backstage_price, backstage_checkbox.state]);

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
    console.log("go to checkout");
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
          concert_info.formatted_time,
          " EST"
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
    sendEmailInvites(user_name);
  };

  // Shows the calendar button
  // Called after the animation is done
  const showCalendarButton = () => {
    document.getElementById("add-to-calendar").style.visibility = "visible";
    // After 8 seconds, end the stub animation and go back to the concert page
    setTimeout(() => {
      if (!stub_animation_done) animationEnd();
    }, 8000);
  };

  // Animated the ticket stub leaving the screen and hides the calendar button
  const animationEnd = () => {
    console.log("animation ended.");
    if (!stub_animation_done) {
      if (document.getElementById("add-to-calendar")) {
        document.getElementById("add-to-calendar").style.visibility = "hidden";
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
    console.log("add to calendar");
    if (!ApiCalendar.sign) {
      await ApiCalendar.handleAuthClick();
    }
    await addEvent();
    animationEnd();
  };

  const addEvent = async () => {

    const eventLoad = {
      summary: concert_info.artist_name + " - " + concert_info.concert_name,
      description: "onfour concert!",
      start: {
        dateTime: new Date(concert_info.formatted_date).toISOString()
      },
      end: {
        dateTime: new Date(new Date(concert_info.formatted_date).getTime() + 90 * 60000).toISOString()
      }
    };

    await ApiCalendar.createEvent(eventLoad)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="concert-page">
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
                      <button
                        id="add-to-calendar"
                        className="buy-ticket-button calendar-button"
                        onClick={addToCalendar}
                      >
                        Add to Calendar
                      </button>
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
          <PulseLoader
            sizeUnit={"px"}
            size={18}
            color={"#7b6dac"}
            loading={!concert_info}
          />
        </div>
      ) : (
        <Grid>
          <Rodal
            visible={open_modal}
            onClose={hideModal}
            width={120}
            height={70}
            measure="vh"
            customStyles={{ padding: 0, overflow: scroll }}
            className="rodal-custom"
          >
            <Grid className="modal-grid">
              <Row className="modal-row">
                <Col size={4} className="modal-left-col">
                  <div className="purchase-main">
                    <div className="modal-concert-info">
                      <h3 className="concert-info-modal-header">
                        {concert_info.artist_name}: {concert_info.concert_name}
                      </h3>
                      <p className="concert-date-info">
                        {concert_info.week_day} {concert_info.formatted_date}{" "}
                        {concert_info.formatted_time} EST
                      </p>
                    </div>
                    <hr className="break-modal" />
                    <div className="ticket-types">
                      <Row className="ticket-row">
                        <Col size={1}></Col>
                        <Col size={3}>
                          <Checkbox
                            state
                            className="p-fill p-round ticket-box p-locked"
                            readOnly
                            icon={
                              <i
                                className="fa fa-check-circle"
                                aria-hidden="true"
                              ></i>
                            }
                          >
                            <span className="checkbox-text">
                              General Admission
                            </span>
                          </Checkbox>
                        </Col>
                        <Col size={1}></Col>
                      </Row>
                      <Row className="ticket-row">
                        <Col size={1}></Col>
                        <Col size={3}>
                          <Checkbox
                            {...backstage_checkbox}
                            shape="round"
                            className="p-fill ticket-box"
                            icon={
                              <i
                                className="fa fa-check-circle"
                                aria-hidden="true"
                              ></i>
                            }
                            disabled
                          >
                            <span className="checkbox-text">
                              Backstage Pass
                            </span>
                          </Checkbox>
                        </Col>
                        <Col size={1}></Col>
                      </Row>
                    </div>

                    <hr className="break-modal" />
                    <div className="invite-friends">
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

                            <p className="invite-text">Invite Your Friends</p>
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
                                You have reached the maximum number of invites!
                              </p>
                            ) : (
                              <p className="emails-warning backstage-hidden-text">
                                Input validated
                              </p>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col size={3} className="modal-right-col">
                  <div className="purchase-review">
                    <div className="order-summary">
                      <Row>
                        <span className="summary-header">Order Summary</span>
                      </Row>
                      <div className="ticket-selections">
                        <Row>
                          <Col size={4}>
                            <span className="item-name">
                              1x General Admission
                            </span>
                          </Col>
                          {general_price > 0 ? (
                            <Col size={1}>
                              <span className="item-price">
                                ${general_price}
                              </span>
                            </Col>
                          ) : (
                            <Col size={1}>
                              <span className="item-price">FREE</span>
                            </Col>
                          )}
                        </Row>
                        {backstage_pass ? (
                          <Row>
                            <Col size={4}>
                              <span className="item-name">
                                1x Backstage Pass
                              </span>
                            </Col>
                            {backstage_price > 0 ? (
                              <Col size={1}>
                                <span className="item-price">
                                  ${backstage_price}
                                </span>
                              </Col>
                            ) : (
                              <Col size={1}>
                                <span className="item-price">FREE</span>
                              </Col>
                            )}
                          </Row>
                        ) : (
                          <Row>
                            <Col size={1}>
                              <div className="backstage-hidden-text">
                                NO BACKSTAGE PASS
                              </div>
                            </Col>
                          </Row>
                        )}
                      </div>
                    </div>
                    <hr className="break-modal right-col-break" />
                    <div className="total-purchase">
                      <Row>
                        <Col size={4}>
                          <span className="item-name total-item">Total</span>
                        </Col>
                        {total > 0 ? (
                          <Col size={1}>
                            <span className="item-price total-item">
                              ${total}
                            </span>
                          </Col>
                        ) : (
                          <Col size={1}>
                            <span className="item-price total-item">FREE</span>
                          </Col>
                        )}
                      </Row>
                    </div>
                    <div className="checkout-button-container">
                      <Row>
                        <Col size={1}>
                          <div>
                            {username ? (
                              <div>
                                {total > 0 ? (
                                  <button
                                    className="checkout-button"
                                    onClick={goToCheckout}
                                    disabled={!username}
                                  >
                                    CHECKOUT
                                  </button>
                                ) : (
                                  <button
                                    className="checkout-button"
                                    onClick={addTicket}
                                    disabled={!username}
                                  >
                                    GET TICKET
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div>
                                {total > 0 ? (
                                  <Tooltip title="Please log in to purchase your ticket">
                                    <button className="checkout-button-disabled">
                                      CHECKOUT
                                    </button>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Please log in to get your ticket">
                                    <button className="checkout-button-disabled">
                                      GET TICKET
                                    </button>
                                  </Tooltip>
                                )}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          </Rodal>

          <Row className="info-row">
            <Col size={1} className="concert-info-col">
              <div className="concert-image-container">
                <img
                  className="concert-image"
                  src={concert_info.img}
                  alt="concert-poster"
                ></img>
              </div>
              <div className="concert-logistics">
                <Row>
                  <div className="concert-genre-box">
                    {concert_info.genre.toUpperCase()}
                  </div>
                </Row>
                <Row className="logistics-row">
                  <span className="logistics-text">
                    {concert_info.week_day.toUpperCase()},{" "}
                    {concert_info.formatted_date}
                  </span>
                </Row>
                <hr className="solid" />
                <Row className="logistics-row">
                  <span className="logistics-text">
                    {concert_info.formatted_time} EST
                  </span>
                </Row>
                <hr className="solid" />
                <Row className="logistics-row">
                  <span className="logistics-text">
                    STREAMED FROM {concert_info.location.toUpperCase()}
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
            </Col>
            <Col size={2} className="concert-info-col main-info-col">
              <Row className="countdown-and-buttons">
                <Col size={1}>
                  <div className="countdown-timer">
                    {/* <span className="countdown">COUNTDOWN TIMER</span> */}
                    <CountdownTimer
                      start_date={concert_info.date}
                      start_time={concert_info.time}
                    />
                  </div>
                  <div className="buy-ticket">
                    <button className="buy-ticket-button" onClick={getTicket}>
                      RSVP
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="concert-text-container">
                  <Col size={1}>
                    <div>
                      <h3 className="titles">
                        {concert_info.artist_name.toUpperCase()} –{" "}
                        {concert_info.concert_name.toUpperCase()}
                      </h3>
                    </div>
                    <div>
                      <p className="artist-description-text">
                        {concert_info.description}
                      </p>
                    </div>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="share-concert-container">
                  <Col size={1}>
                    <div>
                      <h5 className="share-concert-text">Share With Friends</h5>
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
                </div>
              </Row>
            </Col>
          </Row>
          {/* <Row className="suggested-shows"></Row> */}
        </Grid>
      )}
    </div>
  );
};

export default Concert;
