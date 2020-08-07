// React Imports
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import SharePopup from "./share_popup";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import moment from "moment";
import Rodal from "rodal";
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
import VideoChat from "../video_chat/App/video_chat_App";

import { getTickets } from "../../apis/get_user_data";
import PaymentBox from "../payment/donate_box";
// Styles Imports
import "./stream_styles.scss";
import "rodal/lib/rodal.css";

// Image imports
import VenmoCode from "../../images/venmo_codes/onfour_venmo.jpeg";
import ticket1 from "../../images/icons/ticket1.png";

Amplify.configure(awsmobile);

// Main stream page component. Holds stream video, chat, and payment functionality
const StreamPage = () => {
  // DETERMINE MOBILE VERSION OR NOT
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  const tip_based = true; // DEFINES WHETHER SHOW IS TIP OR DONATION BASED
  const [show_chat, setShowChat] = useState(false); // If chat should be shown
  const [chat_name, setChatName] = useState(""); // Sets user name for chat
  const [viewers, setViewers] = useState(0); // Sets number of live viewers on page
  const [email, setEmail] = useState(""); // User email input for subscription
  const [email_submitted, setEmailSubmitted] = useState(false); // If user submitted email
  const [show_start_time, setStartTime] = useState(""); // Stores the upcoming show's start time
  const [show_time, setShowTime] = useState(""); // Store the upcoming show's start time to display
  const [artist_name, setArtistName] = useState(""); // Stores the upcoming show's artist name
  const [artist_bio, setArtistBio] = useState("");
  const [artist_ig, setArtistIG] = useState("");
  const [artist_fb, setArtistFB] = useState("");
  const [artist_spotify, setArtistSpotify] = useState("");
  const [artist_twitter, setArtistTwitter] = useState("");
  const [artist_youtube, setArtistYoutube] = useState("");
  const [concert_name, setConcertName] = useState(""); // Stores the upcoming show's concert name
  const [concert_id, setConcertID] = useState("");
  const [is_live, setIsLive] = useState(false);
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [username, setUsername] = useState(""); // Username from login
  const [button_icon, setButtonIcon] = useState("fa fa-chevron-right");
  const [show_popup, setShowPopup] = useState(false); // If popup should be shown
  const [description_button_icon, setDescriptionButtonIcon] = useState(
    "fa fa-chevron-down"
  );
  const [is_free, setIsFree] = useState(true);
  const [purchasedTickets, setTickets] = useState([]);

  const history = useHistory();

  // Function passed as prop to chat
  const chatStatus = (mode) => {
    setShowChat(mode);
  };

  // Function passed as prop to chat to get viewer numbers
  const getViewers = (num_viewers) => {
    setViewers(num_viewers);
  };

  // EMAIL SUBSCRIBTION SECTION

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
  // useEffect(() => {
  //   document.addEventListener("scroll", () => {
  //     if (176 + (width / 100) * 41 - height > 0) {
  //       if (document.getElementById("chat_main")) {
  //         const scrollCheck_top =
  //           window.scrollY > 176 + (width / 100) * 41 - height;
  //         const scrollCheck_bottom = window.scrollY < 176;
  //         if (!scrollCheck_top) {
  //           // if the scroll is not larger than threshold to increase height
  //           document.getElementById("chat_main").style.height =
  //             (width / 100) * 41 + "px";
  //         } else if (scrollCheck_bottom) {
  //           // is scroll is larger than lower threshold but less than higher threshold
  //           document.getElementById("chat_main").style.height =
  //             window.scrollY - 176 + height + "px";
  //         } else {
  //           document.getElementById("chat_main").style.height = height + "px";
  //         }
  //       }
  //     } else {
  //       if (document.getElementById("chat_main")) {
  //         const scrollCheck_top = window.scrollY === 0;
  //         const scrollCheck_bottom = window.scrollY < 176;
  //         if (scrollCheck_top) {
  //           document.getElementById("chat_main").style.height =
  //             (width / 100) * 41 + "px";
  //         } else if (scrollCheck_bottom) {
  //           document.getElementById("chat_main").style.height =
  //             (width / 100) * 41 + window.scrollY + "px";
  //         } else {
  //           document.getElementById("chat_main").style.height = height + "px";
  //         }
  //       }
  //     }
  //   });
  // });

  // POP_UP WARNING SECTION
  // const [show_alert, setShowAlert] = useState(true); // If pre-show alert should be shown
  // // Hides popup if closed
  // const hidePopup = () => {
  //   setShowAlert(false);
  // };

  // GETTING INFORMATION ABOUT MOST RECENT UPCOMING SHOW

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
    setArtistBio(artist_info_list.artist_bio);
    // setArtistFB(artist_info_list.facebook);
    // setArtistIG(artist_info_list.instagram);
    // setArtistSpotify(artist_info_list.spotify);
    // setArtistTwitter(artist_info_list.twitter);
    // setArtistYoutube(artist_info_list.youtube);
    setArtistFB("https://instagram.com/superduperfriend");
    setArtistIG("https://instagram.com/superduperfriend");
    setArtistSpotify("https://instagram.com/superduperfriend");
    setArtistTwitter("https://instagram.com/superduperfriend");
    setArtistYoutube("https://instagram.com/superduperfriend");
  };

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

  const [open_modal, setOpenModal] = useState(false);
  // Analytics tracker for payment modal
  const donateModal = () => {
    Analytics.record({ name: "paymentModalClicked" });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
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

  const toggleDescription = () => {
    if (description_button_icon === "fa fa-chevron-down") {
      setDescriptionButtonIcon("fa fa-chevron-up");
      document.getElementById("artist_bio").style.display = "none";
      document.getElementById("stream_info_section").style.height = "14%";
      document.getElementById("stream_main_section").style.height = "86%";
      document.getElementById("stream_info_bottom").style.height = "43%";
      document.getElementById("stream_info_top").style.height = "57%";
    } else {
      setDescriptionButtonIcon("fa fa-chevron-down");
      document.getElementById("artist_bio").style.display = "flex";
      document.getElementById("stream_info_section").style.height = "40%";
      document.getElementById("stream_main_section").style.height = "60%";
      document.getElementById("stream_info_bottom").style.height = "15%";
      document.getElementById("stream_info_top").style.height = "20%";
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

  // Opens custom popup and records analytics for share button being clicked
  const openPopup = () => {
    Analytics.record({ name: "shareButtonClicked" });
    setShowPopup(true);
  };

  // Close popup when user clicks away
  const closePopup = () => {
    setShowPopup(false);
  };

  // TOGGLE BETWEEN CHAT AND VIDEO CHAT SECTION
  const turnOnVideoChat = () => {
    if (document.getElementById("chat-main")) {
      document.getElementById("chat-main").style.display = "none";
      document.getElementById("video-chat-main").style.display = "block";
      document
        .getElementById("chat-circle")
        .classList.remove("selected-circle");
      document.getElementById("video-circle").classList.add("selected-circle");
    }
  };
  const turnOnChat = () => {
    if (document.getElementById("video-chat-main")) {
      document.getElementById("chat-main").style.display = "inline";
      document.getElementById("video-chat-main").style.display = "none";
      document
        .getElementById("video-circle")
        .classList.remove("selected-circle");
      document.getElementById("chat-circle").classList.add("selected-circle");
    }
  };

  const getIsLive = async () => {
    // Calling the API, using async and await is necessary
    if (concert_id) {
      console.log("calling api");
      await API.graphql(
        graphqlOperation(queries.get_concert_is_live, {
          id: concert_id,
        })
      ).then((data) => {
        if (data.data.getConcert.is_live) {
          setIsLive(data.data.getConcert.is_live);
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getIsLive();
    }, 5000);
  });

  // RENDERING SECTION
  return (
    <div className="stream-container">
      {artist_name ? (
        <div className="stream-page-content">
          {width > 600 ? (
            <Grid className="desktop-stream-grid">
              <Rodal
                visible={open_modal}
                onClose={closeModal}
                width={100}
                height={100}
                measure="%"
                customStyles={{
                  padding: 0,
                  overflow: scroll,
                  maxHeight: "50vh",
                  maxWidth: "50vw",
                }}
                className="rodal-custom"
              >
                <PaymentBox />
              </Rodal>
              {/* <Modal is_open={open_modal}></Modal> */}
              <Row className="desktop-stream-row">
                {/* <Col size={0.5}></Col> */}
                <Col size={6} id="stream_col" className="stream-col">
                  <div className="stream-main" id="stream_main_section">
                    <div className="stream-wrapper" id="video_player">
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
                          is_live={is_live}
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
                          <i className={button_icon}></i>
                        </button>
                      </div>
                      <div className="toggle-description">
                        <button
                          className="toggle-description-button"
                          onClick={toggleDescription}
                        >
                          <i className={description_button_icon}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="stream-info-wrapper" id="stream_info_section">
                    <Row className="stream-info-row">
                      <Col size={1}>
                        <Row className="buttons-row" id="stream_info_top">
                          <Col size={2}>
                            <div className="artist-name-container">
                              <h3 className="artist-name-stream">
                                {artist_name}
                              </h3>
                            </div>
                          </Col>
                          <Col size={3}>
                            <Row className="stream-share-row">
                              <ClickAwayListener onClickAway={closePopup}>
                                <div className="stream-action-button-container">
                                  <button
                                    className="stream-action-button"
                                    onClick={openPopup}
                                  >
                                    <i
                                      className="fa fa-share stream-action-button-icon"
                                      aria-hidden="true"
                                    ></i>
                                    Share
                                  </button>

                                  <SharePopup show={show_popup} />
                                </div>
                              </ClickAwayListener>

                              <div className="stream-action-button-container">
                                <button className="stream-action-button">
                                  {" "}
                                  <i
                                    className="fa fa-usd stream-action-button-icon"
                                    aria-hidden="true"
                                  ></i>
                                  Donate
                                </button>
                              </div>

                              <div className="viewers">
                                <span className="viewer-count show-time">
                                  {viewers} watching now
                                </span>
                              </div>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="artist-bio-row" id="artist_bio">
                          <Col size={1}>
                            {/* <h5 className="show-time">
                              {show_time} (refresh the page if stream doesn't
                              show up)
                            </h5> */}
                            <div className="stream-artist-bio-container">
                              <p className="stream-artist-bio">{artist_bio}</p>
                            </div>
                          </Col>
                        </Row>
                        <Row
                          className="bottom-buttons-row"
                          id="stream_info_bottom"
                        >
                          <Col size={1}>
                            <div className="social-media-container">
                              <ul className="social-list">
                                {artist_ig ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: "socialBarInsta",
                                        })
                                      }
                                      href={artist_ig}
                                      className="fa fa-instagram"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <span>Instagram Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {artist_spotify ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: "socialBarSpotify",
                                        })
                                      }
                                      href={artist_spotify}
                                      className="fa fa-spotify"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <span>Spotify Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {artist_youtube ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: "socialBarYoutube",
                                        })
                                      }
                                      href={artist_youtube}
                                      className="fa fa-youtube"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <span>Youtube Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {artist_fb ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: "socialBarFacebook",
                                        })
                                      }
                                      href={artist_fb}
                                      className="fa fa-facebook"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <span>Facebook Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {artist_twitter ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: "socialBarTwitter",
                                        })
                                      }
                                      href={artist_twitter}
                                      className="fa fa-twitter"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <span>Twitter Link</span>
                                    </a>
                                  </li>
                                ) : null}
                              </ul>
                            </div>
                          </Col>
                          <Col size={1}>
                            <div className="feedback-container">
                              <a
                                onClick={() =>
                                  Analytics.record({
                                    name: "sendFeedbackClicked",
                                  })
                                }
                                href="https://forms.gle/5rP8nXznckGCuRE77"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <h5 className="show-time feedback-link">
                                  Share thoughts on your experience
                                </h5>
                              </a>
                            </div>
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
                  </div>
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
                          @SpencerAmer from onfour will ensure your tip is sent
                          to {artist_name}.
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
                            //data-toggle="modal"
                            //data-target="#paymentModal"
                            onClick={donateModal}
                          >
                            Tip with Card
                          </button>{" "}
                          {/* <Modal></Modal> */}
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
                                  className="stream-email-form"
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
                <Col size={3} id="chat_container" className="sticky-container">
                  <div className="chat-main" id="chat_main">
                    <div className="chat-wrapper">
                      <Row className="video-chat-row">
                        <VideoChat
                          user_name={username ? username : "GUEST"}
                          artist_name="vinnykris"
                        ></VideoChat>
                      </Row>
                      <Row className="chat-row">
                        <Chat
                          chat_name={username ? username : "GUEST"}
                          chatStatus={chatStatus}
                          setViewers={getViewers}
                        />
                      </Row>
                      {/* <Row className="controll-toolbar-row">
                        <Col size="1" className="controll-toolbar-col">
                          <div className="controll-toolbar-button-container button-glass">
                            <i
                              id="placeholder1"
                              className="fa fa-glass controll-toolbar-button"
                            ></i>
                          </div>
                        </Col>
                        <Col size="1" className="controll-toolbar-col">
                          <div className="controll-toolbar-button-container button-smile-o">
                            <i
                              id="placeholder2"
                              className="fa fa-smile-o controll-toolbar-button"
                            ></i>
                          </div>
                        </Col>
                        <Col size="1" className="controll-toolbar-col">
                          <div
                            className="controll-toolbar-button-container button-commenting-o"
                            onClick={turnOnChat}
                          >
                            <i
                              id="chat-circle"
                              className="fa fa-commenting-o controll-toolbar-button selected-circle"
                            ></i>
                          </div>
                        </Col>
                        <Col size="1" className="controll-toolbar-col">
                          <div
                            className="controll-toolbar-button-container button-video-camera"
                            onClick={turnOnVideoChat}
                          >
                            <i
                              id="video-circle"
                              className="fa fa-video-camera controll-toolbar-button"
                            ></i>
                          </div>
                        </Col>
                        <Col size="1" className="controll-toolbar-col">
                          <div className="controll-toolbar-button-container button-hand-rock-o">
                            <i
                              id="placeholder3"
                              className="fa fa-hand-rock-o controll-toolbar-button"
                            ></i>
                          </div>
                        </Col>
                        <Col size="1" className="controll-toolbar-col">
                          <div className="controll-toolbar-button-container button-heart">
                            <i
                              id="placeholder4"
                              className="fa fa-heart controll-toolbar-button"
                            ></i>
                          </div>
                        </Col>
                      </Row> */}
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
                        is_live={is_live}
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
