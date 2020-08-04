// React Imports
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Popup from "reactjs-popup";
import SharePopup from "./share_popup";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import moment from "moment";
// import { Prompt } from "react-router";
import { useHistory } from "react-router-dom";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
// Amplify Imports
import Auth from "../../apis/UserPool";

// Component Imports
import VideoPlayer from "./video_player";
import Chat from "../chat/stream_chat";
// import Join from "../chat/join_chat";
// import WaitingChat from "../chat/chat_waiting";
import { Grid, Row, Col } from "../grid";
import SocialBar from "../social_bar/social_bar";
import Modal from "../payment/payment_modal";
import { useWindowDimensions } from "../custom_hooks";
import { getTickets } from "../../apis/get_user_data";
// Styles Imports
import "./stream_styles.scss";

// Image imports
import VenmoCode from "../../images/venmo_codes/onfour_venmo.jpeg";
import ticket1 from "../../images/icons/ticket1.png";

Amplify.configure(awsmobile);

// Main stream page component. Holds stream video, chat, and payment functionality
const StreamPage = () => {
  // DETERMINE MOBILE VERSION OR NOT
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // DONATION SECTION
  const tip_based = true; // DEFINES WHETHER SHOW IS TIP OR DONATION BASED

  // CHAT SECTION
  const [show_chat, setShowChat] = useState(false); // If chat should be shown
  const [chat_name, setChatName] = useState(""); // Sets user name for chat
  const [viewers, setViewers] = useState(0); // Sets number of live viewers on page
  const history = useHistory();
  // Function passed as prop to join chat
  // const joinSubmit = (name, mode) => {
  //   setChatName(name);
  //   // setShowChat(mode);
  // };
  // Function passed as prop to chat
  const chatStatus = (mode) => {
    setShowChat(mode);
  };

  // Function passed as prop to chat to get viewer numbers
  const getViewers = (num_viewers) => {
    setViewers(num_viewers);
  };

  // EMAIL SUBSCRIBTION SECTION
  const [email, setEmail] = useState(""); // User email input for subscription
  const [email_submitted, setEmailSubmitted] = useState(false); // If user submitted email
  // Function when user submits email
  const emailSubmit = (event) => {
    event.preventDefault();

    Analytics.record({ name: "emailSubscribeClicked" });

    const payload = {
      email: email,
      paid: false,
    };

    API.graphql(
      graphqlOperation(mutations.create_email_subscription, { input: payload })
    );

    setEmail("");
    setEmailSubmitted(true);
  };

  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true); // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: "10px", behavior: "smooth" });
    setScroll(false);
  }

  // ADJUST CHAT HEIGHT BASED ON SCROLL AMOUNT
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (176 + (width / 100) * 41 - height > 0) {
        if (document.getElementById("chat_main")) {
          const scrollCheck_top =
            window.scrollY > 176 + (width / 100) * 41 - height;
          const scrollCheck_bottom = window.scrollY < 176;
          if (!scrollCheck_top) {
            // if the scroll is not larger than threshold to increase height
            document.getElementById("chat_main").style.height =
              (width / 100) * 41 + "px";
          } else if (scrollCheck_bottom) {
            // is scroll is larger than lower threshold but less than higher threshold
            document.getElementById("chat_main").style.height =
              window.scrollY - 176 + height + "px";
          } else {
            document.getElementById("chat_main").style.height = height + "px";
          }
        }
      } else {
        if (document.getElementById("chat_main")) {
          const scrollCheck_top = window.scrollY === 0;
          const scrollCheck_bottom = window.scrollY < 176;
          if (scrollCheck_top) {
            document.getElementById("chat_main").style.height =
              (width / 100) * 41 + "px";
          } else if (scrollCheck_bottom) {
            document.getElementById("chat_main").style.height =
              (width / 100) * 41 + window.scrollY + "px";
          } else {
            document.getElementById("chat_main").style.height = height + "px";
          }
        }
      }
    });
  });

  // POP_UP WARNING SECTION
  // const [show_alert, setShowAlert] = useState(true); // If pre-show alert should be shown
  // // Hides popup if closed
  // const hidePopup = () => {
  //   setShowAlert(false);
  // };

  // GETTING INFORMATION ABOUT MOST RECENT UPCOMING SHOW
  const [show_start_time, setStartTime] = useState(""); // Stores the upcoming show's start time
  const [show_time, setShowTime] = useState(""); // Store the upcoming show's start time to display
  const [artist_name, setArtistName] = useState(""); // Stores the upcoming show's artist name
  const [concert_name, setConcertName] = useState(""); // Stores the upcoming show's concert name
  const [concert_id, setConcertID] = useState("");
  const [is_live, setIsLive] = useState(false);
  const [is_free, setIsFree] = useState(true);

  // If the user is logged in/valid, set their auth value to true and track their email
  // If the user is not logged in/invalid, reset their auth value to false
  useEffect(() => {
    Auth.currentAuthenticatedUser({})
      .then(async (user) => {
        setUsername(user.username);
        setShowChat(true);
        setAuth(true);
        setTickets(await getTickets(user.username));
      })
      .catch((err) => setAuth(false));
  }, []);

  // Get the start time for countdown_timer
  // Call stream page analtics
  useEffect(() => {
    getStartTime();
  }, []);
  // Query upcoming show database
  const getStartTime = async () => {
    // Calling the API, using async and await is necessary
    const info = await API.graphql(
      graphqlOperation(queries.list_concerts, {
        filter: { is_future: { eq: true }, is_confirmed: { eq: true } },
      })
    );
    const info_list = info.data.listConcerts.items; // Stores the items in database
    info_list.sort((a, b) =>
      moment(a.date + "T" + a.time).diff(moment(b.date + "T" + b.time))
    );

    const hour = parseInt(info_list[0].time.slice(0, 2));
    const minutes = info_list[0].time.slice(2, 5);

    setStartTime(info_list[0].date + "T" + info_list[0].time + ".000-04:00");
    setShowTime(
      info_list[0].date +
        " " +
        (hour > 12
          ? (hour - 12).toString() + minutes + "PM"
          : hour < 12
          ? info_list[0].time.slice(0, 5) + "AM"
          : info_list[0].time.slice(0, 5) + "PM")
    );
    setConcertName(info_list[0].concert_name);
    getArtistInfo(info_list[0].artist_id);
    setConcertID(info_list[0].id);
    setIsLive(info_list[0].is_live);
    setIsFree(info_list[0].general_price === 0);
  };

  const getArtistInfo = async (artist_id) => {
    const artist_info = await API.graphql(
      graphqlOperation(queries.get_artist_info, {
        username: artist_id,
      })
    );
    const artist_info_list = artist_info.data.getCreateOnfourRegistration;
    setArtistName(artist_info_list.artist_name);
  };

  // GET USER'S REGISTRATION INFORMATION
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [username, setUsername] = useState(""); // Username from login
  const [purchasedTickets, setTickets] = useState([]);

  // If the first name for the logged in user's email has not been retrieved yet,
  // query the registration database's table to retrieve the first name filtered
  // for the specific email and assign that value to first
  // if (first === "" && user_email !== "") {
  //   API.graphql(
  //     graphqlOperation(queries.query_name, {
  //       filter: { email: { eq: user_email } },
  //     })
  //   ).then((data) => {
  //     setUsername(data.data.listCreateOnfourRegistrations.items[0].username);
  //     setFirst(data.data.listCreateOnfourRegistrations.items[0].first);
  //     setUserID(data.data.listCreateOnfourRegistrations.items[0].id);
  //     setShowChat(true);
  //   });
  // }

  // DONATION SECTION
  // Opens link to paypal account for musician
  const donatePaypal = () => {
    Analytics.record({ name: "paypalClicked" });
    const url = "https://bit.ly/3dN8gOB";
    window.open(url, "_blank");
  };

  // Analytics tracker for payment modal
  const donateModal = () => {
    Analytics.record({ name: "paymentModalClicked" });
  };

  // Record in analytics that stream page was visited
  const streamPageVisit = () => {
    Analytics.record({ name: "totalStreamPageVisits" });
  };

  // Record in analytics that stream page was visited (logged in and logged out)
  useEffect(() => {
    streamPageVisit();
    Auth.currentAuthenticatedUser({}).then((user) => {
      authenticatedStreamPageVisit();
    });
  }, []);
  const authenticatedStreamPageVisit = () => {
    Analytics.record({ name: "totalAuthenticatedStreamPageVisits" });
  };

  // TOGGLE CHAT SECTION
  const [button_icon, setButtonIcon] = useState("fa fa-chevron-right");
  const toggleChat = () => {
    if (button_icon === "fa fa-chevron-right") {
      setButtonIcon("fa fa-chevron-left");
      document.getElementById("chat_container").style.display = "none";
      // document.getElementById("chat_container").style.display = "none";
      document.getElementById("stream_col").style.flex = "9";
    } else {
      setButtonIcon("fa fa-chevron-right");
      document.getElementById("chat_container").style.display = "inline";
      document.getElementById("stream_col").style.flex = "7";
    }
  };

  // const StyledPopup = styled(Popup)`
  //   // use your custom style for ".popup-overlay"
  //   &-overlay {
  //   }
  //   // use your custom style for ".popup-content"
  //   &-content {
  //     top: 0;
  //     background-color: yellow;
  //   }
  // `;

  // Social media sharing
  const [show_popup, setShowPopup] = useState(false); // If popup should be shown

  // Opens custom popup and records analytics for share button being clicked
  const openPopup = () => {
    Analytics.record({ name: "shareButtonClicked" });
    setShowPopup(true);
  };

  // Close popup when user clicks away
  const closePopup = () => {
    setShowPopup(false);
  };

  // RENDERING SECTION
  return (
    <div className="stream-container">
      {artist_name ? (
        <div className="stream-page-content">
          {width > 600 ? (
            <Grid>
              <Row>
                {/* <Col size={0.5}></Col> */}
                <Col size={7} id="stream_col">
                  <div className="stream-main">
                    <div className="stream-wrapper">
                      {is_free ||
                      (purchasedTickets &&
                        purchasedTickets.indexOf(concert_id)) >= 0 ? (
                        <VideoPlayer
                          url={
                            "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
                          }
                          start_time={show_start_time}
                          artist_name={artist_name}
                          concert_name={concert_name}
                          auth={auth}
                          username={username}
                          concert_id={concert_id}
                        />
                      ) : (
                        <div className="buy-ticket-message-container">
                          <div className="buy-ticket-message-inner-top">
                            <Row className="buy-ticket-message-row">
                              <Col size={2}>
                                <img
                                  src={ticket1}
                                  className="buy-ticket-img"
                                ></img>
                              </Col>
                              <Col size={4} className="buy-ticket-text-col">
                                <div className="buy-ticket-text-container">
                                  <Row>
                                    <h4 className="buy-ticket-text">
                                      It looks like your ticket is missing.
                                    </h4>
                                  </Row>
                                  <Row>
                                    <h5 className="buy-ticket-text">
                                      Go get your ticket below!
                                    </h5>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <button
                            className="buy-ticket-redirect-button"
                            onClick={() =>
                              history.push("/upcoming/" + concert_id)
                            }
                          >
                            Get Ticket
                          </button>
                        </div>
                      )}
                      <div className="toggle-chat">
                        <button
                          className="toggle-chat-button"
                          onClick={toggleChat}
                        >
                          <i class={button_icon}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <Row className="stream-info-row">
                    <Col size={7}>
                      <Row>
                        <Col size={2}>
                          <h3 className="artist-name-stream">{artist_name}</h3>
                        </Col>
                        <Col size={3}>
                          <Row className="stream-share-row">
                            <div className="feedback-container">
                              <a
                                onClick={Analytics.record({
                                  name: "sendFeedbackClicked",
                                })}
                                href="https://forms.gle/5rP8nXznckGCuRE77"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <h5 className="show-time feedback-link">
                                  SEND FEEDBACK
                                </h5>
                              </a>
                            </div>

                            <ClickAwayListener onClickAway={closePopup}>
                              <div className="share-container">
                                <span
                                  className="share-button"
                                  onClick={openPopup}
                                >
                                  <i
                                    class="fa fa-share show-time"
                                    aria-hidden="true"
                                  ></i>
                                  <h5 className="show-time share-text">
                                    SHARE
                                  </h5>
                                </span>

                                <SharePopup show={show_popup} />
                              </div>
                            </ClickAwayListener>

                            <div className="viewers">
                              <h5 className="viewer-count show-time">
                                {viewers} watching now
                              </h5>
                            </div>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={2}>
                          <h5 className="show-time">
                            {show_time} (refresh the page if stream doesn't show
                            up)
                          </h5>
                        </Col>
                      </Row>

                      {/* </Col> */}
                      {/* <Col size={1} className="social-bar-center">
                           <SocialBar />
                      </Col> */}
                    </Col>
                    {/* <Col size={2.5}></Col>
                    <Col size={0.5}></Col> */}
                  </Row>
                  <Row>
                    <div className="short-term-spacer">
                      {/* <Col>
                        <img className="artist-image" src={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/achille.png"}></img>
                      </Col> */}
                    </div>
                  </Row>

                  {/* DONATE ROW */}
                  <Row className="donate-row">
                    <Col size={1} className="donate-stripe donate-box">
                      <p className="donate-description">Credit Card</p>
                      {tip_based ? (
                        <p className="donate-subdescription">
                          Tip {artist_name} via credit card. Your card
                          information will not be stored anywhere.
                        </p>
                      ) : (
                        <p className="donate-subdescription">
                          Donate via credit card to For the GWORLS and LGBTQ
                          Freedom Fund. Your card information will not be stored
                          anywhere.
                        </p>
                      )}
                    </Col>
                    <Col size={1} className="donate-paypal donate-box">
                      <p className="donate-description">PayPal</p>
                      {tip_based ? (
                        <p className="donate-subdescription">
                          onfour will ensure your tip is sent to {artist_name}.
                        </p>
                      ) : (
                        <p className="donate-subdescription">
                          onfour will ensure your donation is sent to For the
                          GWORLS and LGBTQ Freedom Fund.
                        </p>
                      )}
                    </Col>
                    <Col size={1} className="donate-venmo donate-box">
                      <p className="donate-description">Venmo</p>
                      {tip_based ? (
                        <p className="donate-subdescription">
                          onfour (@SpencerAmer) will ensure your tip is sent to{" "}
                          {artist_name}.
                        </p>
                      ) : (
                        <p className="donate-subdescription">
                          @SpencerAmer from onfour will ensure your donation is
                          sent to For the GWORLS and LGBTQ Freedom Fund.
                        </p>
                      )}
                    </Col>
                  </Row>

                  {/* DONATE ROW */}
                  <Row className="donate-row-buttons">
                    {tip_based ? (
                      <div className="payment-container">
                        <Col
                          size={1}
                          className="donate-stripe donate-box-button"
                        >
                          <button
                            className="stripe-button-border button-height"
                            data-toggle="modal"
                            data-target="#paymentModal"
                            onClick={donateModal}
                          >
                            Tip with Card
                          </button>{" "}
                          <Modal></Modal>
                        </Col>
                        <Col
                          size={1}
                          className="donate-paypal donate-box-button"
                        >
                          <button
                            className="stripe-button-border button-height paypal-button"
                            onClick={donatePaypal}
                          >
                            Tip with Paypal
                          </button>
                        </Col>
                        <Col
                          size={1}
                          className="donate-venmo donate-box-button"
                        >
                          <img
                            className="venmo-code"
                            src={VenmoCode}
                            alt="venmo-qr"
                          ></img>
                        </Col>
                      </div>
                    ) : (
                      <div className="payment-container">
                        <Col
                          size={1}
                          className="donate-stripe donate-box-button"
                        >
                          <button
                            className="stripe-button-border button-height"
                            data-toggle="modal"
                            data-target="#paymentModal"
                            onClick={donateModal}
                          >
                            Donate with Card
                          </button>{" "}
                          <Modal></Modal>
                        </Col>
                        <Col
                          size={1}
                          className="donate-paypal donate-box-button"
                        >
                          <button
                            className="stripe-button-border button-height paypal-button"
                            onClick={donatePaypal}
                          >
                            Donate with Paypal
                          </button>
                        </Col>
                        <Col
                          size={1}
                          className="donate-venmo donate-box-button"
                        >
                          <img
                            className="venmo-code"
                            src={VenmoCode}
                            alt="venmo-qr"
                          ></img>
                        </Col>
                      </div>
                    )}
                  </Row>

                  <Row className="stream-subscribe-box">
                    <Col size={0.5}></Col>
                    <Col size={7}>
                      <Row>
                        <p className="stream-subscribe-title">Subscribe</p>
                      </Row>
                      <Row>
                        <Col size={3}>
                          <p className="stream-subscribe-description">
                            To stay informed about upcoming events, subscribe to
                            our mailing list:
                          </p>
                          {(() => {
                            if (email_submitted) {
                              return (
                                <p className="subscribe-success">
                                  Thank you and stay tuned!
                                </p>
                              );
                            } else {
                              return (
                                <form
                                  class="stream-email-form"
                                  action="/"
                                  id="newsletter"
                                  onSubmit={emailSubmit}
                                >
                                  <input
                                    type="email"
                                    placeholder="Enter your email here..."
                                    name="email"
                                    required
                                    value={email}
                                    style={{ width: "70%" }}
                                    onChange={(event) =>
                                      setEmail(event.target.value)
                                    }
                                  />
                                  <button
                                    type="submit"
                                    form="newsletter"
                                    value="Submit"
                                    style={{ width: "auto" }}
                                    className="button-border button-height adjust-font-size"
                                  >
                                    {" "}
                                    Submit
                                  </button>
                                </form>
                              );
                            }
                          })()}
                        </Col>
                        <Col size={1}></Col>
                        <Col size={3}>
                          <SocialBar
                            show_text={true}
                            instagram={"https://www.instagram.com/_onfour"}
                            spotify={
                              "https://open.spotify.com/playlist/3KbuKf1zti8EtbJ4Ot7Iq4"
                            }
                            youtube={
                              "https://www.youtube.com/channel/UCwbWryexV1632eZ_pILnmTQ"
                            }
                            facebook={"https://www.facebook.com/onfour"}
                            twitter={"https://twitter.com/_Onfour"}
                          ></SocialBar>
                        </Col>
                      </Row>
                    </Col>
                    <Col size={0.5}></Col>
                  </Row>
                </Col>

                <Col
                  size={2.5}
                  id="chat_container"
                  className="sticky-container"
                >
                  <div className="chat-main" id="chat_main">
                    <div className="chat-wrapper">
                      {/* {
                      username ? (
                        <Chat
                          chat_name={username ? username : null}
                          chatStatus={chatStatus}
                        />
                      ) : (
                        // <Join joinSubmit={joinSubmit} />
                        <WaitingChat />
                      )
                      } */}
                      {/* {console.log(username)} */}
                      <Chat
                        chat_name={username ? username : "GUEST"}
                        chatStatus={chatStatus}
                        setViewers={getViewers}
                      />
                    </div>
                  </div>
                </Col>
                {/* <Col size={0.5}></Col> */}
              </Row>
              {/* BELOW IS THE CODE FOR THE ARTIST INFORMATION*/}
            </Grid>
          ) : (
            <div className="mobile-grid-stream">
              <div className="main-column">
                <div className="mobile-row stream-main-mobile">
                  <div className="stream-wrapper-mobile">
                    {is_free ||
                    (purchasedTickets &&
                      purchasedTickets.indexOf(concert_id)) >= 0 ? (
                      <VideoPlayer
                        url={
                          "https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8"
                        }
                        start_time={show_start_time}
                        artist_name={artist_name}
                        concert_name={concert_name}
                        auth={auth}
                        username={username}
                        concert_id={concert_id}
                      />
                    ) : (
                      <div className="buy-ticket-message-container">
                        <div className="buy-ticket-message-inner">
                          <div className="buy-ticket-message-inner-top">
                            <Row>
                              <Col size={2}>
                                <img
                                  src={ticket1}
                                  className="buy-ticket-img"
                                ></img>
                              </Col>
                              <Col size={4} className="buy-ticket-text-col">
                                <div className="buy-ticket-text-container">
                                  <Row>
                                    <h4 className="buy-ticket-text">
                                      It looks like your ticket is missing.
                                    </h4>
                                  </Row>
                                  <Row>
                                    <h5 className="buy-ticket-text">
                                      Go get your ticket below!
                                    </h5>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <button
                            className="buy-ticket-redirect-button"
                            onClick={() =>
                              history.push("/upcoming/" + concert_id)
                            }
                          >
                            Get Ticket
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mobile-row payment-row-mobile">
                  {tip_based ? (
                    <button
                      className="stripe-button-border mobile-payment-button"
                      data-toggle="modal"
                      data-target="#paymentModal"
                    >
                      Tip {artist_name}
                    </button>
                  ) : (
                    <button
                      className="stripe-button-border mobile-payment-button"
                      data-toggle="modal"
                      data-target="#paymentModal"
                    >
                      Donate
                    </button>
                  )}
                  <Modal isOpen={false}></Modal>
                </div>
                <div className="chat-main-mobile">
                  <div className="chat-wrapper-mobile">
                    <Chat
                      chat_name={username ? username : "GUEST"}
                      chatStatus={chatStatus}
                      setViewers={getViewers}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // <div className={!show_start_time ? 'parentDisable' : ''} width="100%">
        <div className="overlay-box">
          <PulseLoader
            sizeUnit={"px"}
            size={18}
            color={"#7b6dac"}
            loading={!artist_name}
          />
        </div>
        // </div>
      )}
    </div>
  );
};

export default StreamPage;
