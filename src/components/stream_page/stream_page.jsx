// React Imports
import React, { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
import ScaleLoader from 'react-spinners/ScaleLoader'
import SharePopup from './share_popup'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import moment from 'moment'
import Rodal from 'rodal'
// import { Prompt } from "react-router";
import { useHistory } from 'react-router-dom'

// AWS Imports
import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import Amplify, { Analytics } from 'aws-amplify'
import awsmobile from '../../apis/AppSync'
// Amplify Imports
import Auth from '../../apis/UserPool'

// Component Imports
import VideoPlayer from './video_player'
import Chat from '../chat/stream_chat'

// import Join from "../chat/join_chat";
// import WaitingChat from "../chat/chat_waiting";
import { Grid, Row, Col } from '../grid'
import { useWindowDimensions } from '../custom_hooks'
import VideoChat from '../video_chat/App/video_chat_App'

import { getTickets } from '../../apis/get_user_data'
import DonateCardBox from '../payment/donate_box'
import VenmoBox from '../payment/venmo_box'
import PaypalBox from '../payment/paypal_box'
import PayTicketBox from '../payment/pay_ticket_box'
import { createUpcomingObject } from '../util'

import AccessModal from './access_modal'
import TicketModal from './ticket_modal'
// Styles Imports
import './stream_styles.scss'
import 'rodal/lib/rodal.css'

// Image imports
import ticket1 from '../../images/icons/ticket1.png'
import feedback_icon from '../../images/icons/stream_icons/feedback_icon.png'
import share_icon from '../../images/icons/stream_icons/share_icon.png'
import viewers_icon from '../../images/icons/stream_icons/viewers_icon.png'

// Utils
import { getCrewsByUsername } from '../../utils/crew'
import { didUserRSVP } from "../../utils/concert"
import { getArtistInfo } from '../../apis/get_concert_data'
import { rsvp_template_id } from '../../apis/email_js'

Amplify.configure(awsmobile)

// Main stream page component. Holds stream video, chat, and payment functionality
const StreamPage = ({ is_soundcheck }) => {
  // DETERMINE MOBILE VERSION OR NOT
  const { height, width } = useWindowDimensions() // Dimensions of screen
  // const tip_based = false; // DEFINES WHETHER SHOW IS TIP OR DONATION BASED
  const [show_chat, setShowChat] = useState(false) // If chat should be shown
  const [chat_name, setChatName] = useState('') // Sets user name for chat
  const [viewers, setViewers] = useState(0) // Sets number of live viewers on page
  const [email, setEmail] = useState('') // User email input for subscription
  const [email_submitted, setEmailSubmitted] = useState(false) // If user submitted email
  const [show_start_time, setStartTime] = useState('') // Stores the upcoming show's start time
  const [show_time, setShowTime] = useState('') // Store the upcoming show's start time to display
  const [artist_id, setArtistID] = useState('')
  const [artist_name, setArtistName] = useState('') // Stores the upcoming show's artist name
  const [artist_bio, setArtistBio] = useState('')
  const [artist_ig, setArtistIG] = useState('')
  const [artist_fb, setArtistFB] = useState('')
  const [artist_spotify, setArtistSpotify] = useState('')
  const [artist_twitter, setArtistTwitter] = useState('')
  const [artist_youtube, setArtistYoutube] = useState('')
  const [artist_merch, setArtistMerch] = useState('')
  const [concert_info, setConcertInfo] = useState('')
  const [concert_name, setConcertName] = useState('') // Stores the upcoming show's concert name
  const [concert_id, setConcertID] = useState('')
  const [concert_crews, setConcertCrews] = useState('')
  const [user_crews, setUserCrews] = useState('')
  const [is_live, setIsLive] = useState(true)
  const [auth, setAuth] = useState(false) // Tracks if user is logged in/valid session
  const [username, setUsername] = useState('') // Username from login
  const [user_email, setUserEmail] = useState('')
  const [rsvp_list, setRSVPList] = useState([])
  const [button_icon, setButtonIcon] = useState('fa fa-chevron-right')
  const [show_popup, setShowPopup] = useState(false) // If popup should be shown
  const [description_button_icon, setDescriptionButtonIcon] = useState(
    'fa fa-chevron-up'
  )
  const [is_free, setIsFree] = useState(true)
  const [purchasedTickets, setTickets] = useState([])

  const [open_modal, setOpenModal] = useState(false)
  const [venmo_selected, setVenmoSelected] = useState(false)
  const [credit_selected, setCreditSelected] = useState(true)
  const [paypal_selected, setPaypalSelected] = useState(false)
  const [stream_volume, setStreamVolume] = useState(1.0)
  const [have_upcoming_concert, setHaveUpcomingConcert] = useState(true)
  const [show_payment_modal, setShowPaymentModal] = useState(false)
  const [show_access_modal, setShowAccessModal] = useState(true)
  const [access_error, setAccessError] = useState(0) // 0 is no error, 1 if user isn't in rsvp list
  const [video_chat_variables, setVideoChatVariables] = useState()

  const history = useHistory(0)

  // Function passed as prop to chat
  const chatStatus = mode => {
    setShowChat(mode)
  }
  // Function passed as prop to chat to get viewer numbers
  const getViewers = num_viewers => {
    setViewers(num_viewers)
  }

  // EMAIL SUBSCRIBTION SECTION

  // Function when user submits email
  const emailSubmit = event => {
    event.preventDefault()

    Analytics.record({ name: 'emailSubscribeClicked' })

    const payload = {
      email: email,
      paid: false
    }

    API.graphql(
      graphqlOperation(mutations.create_email_subscription, { input: payload })
    )

    setEmail('')
    setEmailSubmitted(true)
  }

  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true) // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: '10px', behavior: 'smooth' })
    setScroll(false)
  }

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
      .then(async user => {
        setUsername(user.username)
        setUserEmail(user.attributes.email)
        setShowChat(true)
        setAuth(true)
        setTickets(await getTickets(user.username))
        setUserCrews(await getCrewsByUsername(user.username))
      })
      .catch(err => setAuth(false))
  }, [])

  // Get the start time for countdown_timer
  // Call stream page analtics
  useEffect(() => {
    fetchData()
    // getStartTime();
    getTestingVariables()
  }, [])

  useEffect(() => {
    console.log(rsvp_list, user_email);
    if (rsvp_list.includes(user_email)) {
      setShowAccessModal(false);
    } else {
      setShowAccessModal(true);
    }
  }, [user_email, rsvp_list])

  // Query upcoming show database
  const fetchData = async () => {
    // Calling the API, using async and await is necessary
    const info = await API.graphql(
      graphqlOperation(queries.list_concerts, {
        filter: { is_future: { eq: true }, is_confirmed: { eq: true } }
      })
    )
    if (info.data.listConcerts.items.length) {
      setHaveUpcomingConcert(true)
      const info_list = info.data.listConcerts.items // Stores the items in database
      info_list.sort((a, b) =>
        moment(a.date + 'T' + a.time).diff(moment(b.date + 'T' + b.time))
      )

      const hour = parseInt(info_list[0].time.slice(0, 2))
      const minutes = info_list[0].time.slice(2, 5)

      console.log(info_list[0])
      // setConcertInfo(info_list[0]);
      const concert_data = info_list[0]
      const artist_data = await getArtistInfo(info_list[0].artist_id)
      console.log(createUpcomingObject(concert_data, artist_data))

      setStartTime(info_list[0].date + 'T' + info_list[0].time + '.000-04:00')
      setShowTime(
        info_list[0].date +
          ' ' +
          (hour > 12
            ? (hour - 12).toString() + minutes + 'PM'
            : hour < 12
            ? info_list[0].time.slice(0, 5) + 'AM'
            : info_list[0].time.slice(0, 5) + 'PM')
      )
      // console.log(info_list[0]);
      setConcertName(info_list[0].concert_name)
      setArtistID(info_list[0].artist_id)
      setConcertID(info_list[0].id)
      // setIsLive(info_list[0].is_live);
      setIsFree(info_list[0].general_price === 0)
      setShowAccessModal(info_list[0].general_price > 0)
      setConcertCrews(JSON.parse(info_list[0].crew_list))
      setRSVPList(info_list[0].rsvp_list)
      setConcertInfo(createUpcomingObject(concert_data, artist_data))
    } else {
      setHaveUpcomingConcert(false)
    }
  }

  // const getArtistInfo = async (artist_id) => {
  //   const artist_info = await API.graphql(
  //     graphqlOperation(queries.get_artist_info, {
  //       username: artist_id,
  //     })
  //   );
  //   const artist_info_list = artist_info.data.getCreateOnfourRegistration;
  //   setArtistName(artist_info_list.artist_name);
  //   setArtistBio(artist_info_list.artist_bio);
  //   setArtistFB(artist_info_list.facebook);
  //   setArtistIG(artist_info_list.instagram);
  //   setArtistSpotify(artist_info_list.spotify);
  //   setArtistTwitter(artist_info_list.twitter);
  //   setArtistYoutube(artist_info_list.youtube);
  //   setArtistMerch(artist_info_list.merch);
  // };

  const getTestingVariables = async () => {
    const info = await API.graphql(
      graphqlOperation(queries.get_video_chat_variables, {
        id: 'ea08d153-09ce-48e7-b8c6-97473a6065aa'
      })
    )
    const item = info.data.getVideochat_Testing
    setVideoChatVariables(item)
  }

  // DONATION SECTION
  // Opens link to paypal account for musician
  const donatePaypal = () => {
    Analytics.record({ name: 'paypalClicked' })
    const url = 'https://bit.ly/3dN8gOB'
    window.open(url, '_blank')
  }

  // Analytics tracker for payment modal
  const donateModal = () => {
    Analytics.record({ name: 'paymentModalClicked' })
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  // Record in analytics that stream page was visited
  const streamPageVisit = () => {
    Analytics.record({ name: 'totalStreamPageVisits' })
  }

  // Record in analytics that stream page was visited (logged in and logged out)
  useEffect(() => {
    streamPageVisit()
    Auth.currentAuthenticatedUser({}).then(user => {
      authenticatedStreamPageVisit()
    })
  }, [])
  const authenticatedStreamPageVisit = () => {
    Analytics.record({ name: 'totalAuthenticatedStreamPageVisits' })
  }

  // TOGGLE CHAT SECTION

  const toggleChat = () => {
    if (button_icon === 'fa fa-chevron-right') {
      setButtonIcon('fa fa-chevron-left')
      document.getElementById('chat_container').style.display = 'none'
      // document.getElementById("chat_container").style.display = "none";
      document.getElementById('stream_col').style.flex = '9'
      document.getElementById('chat_toggle_button').style.right = '0px'
    } else {
      setButtonIcon('fa fa-chevron-right')
      document.getElementById('chat_container').style.display = 'inline'
      document.getElementById('stream_col').style.flex = '7'
      document.getElementById('chat_toggle_button').style.right = '-3px'
    }
  }

  const toggleDescription = () => {
    if (description_button_icon === 'fa fa-chevron-down') {
      setDescriptionButtonIcon('fa fa-chevron-up')
      document.getElementById('artist_bio').classList.add('artist-bio-row')
      document
        .getElementById('artist_bio')
        .classList.remove('artist-bio-row-expanded')
      document.getElementById('stream_info_section').style.height = '103px'
      document.getElementById('stream_main_section').style.height =
        'calc(100vh - 103px - 49px)'
      // document.getElementById("description_toggle_button").style.bottom =
      //   "-3px";
    } else {
      setDescriptionButtonIcon('fa fa-chevron-down')
      document
        .getElementById('artist_bio')
        .classList.add('artist-bio-row-expanded')
      document.getElementById('artist_bio').classList.remove('artist-bio-row')
      document.getElementById('stream_info_section').style.height = '297px'
      document.getElementById('stream_main_section').style.height =
        'calc(100vh - 297px - 49px)'
      // document.getElementById("description_toggle_button").style.bottom = "0px";
    }
  }

  // Social media sharing

  // Opens custom popup and records analytics for share button being clicked
  const openPopup = () => {
    Analytics.record({ name: 'shareButtonClicked' })
    setShowPopup(true)
  }

  // Close popup when user clicks away
  const closePopup = () => {
    setShowPopup(false)
  }

  // TOGGLE BETWEEN CHAT AND VIDEO CHAT SECTION
  const turnOnVideoChat = () => {
    if (document.getElementById('chat-main')) {
      document.getElementById('chat-main').style.display = 'none'
      document.getElementById('video-chat-main').style.display = 'block'
      document.getElementById('chat-circle').classList.remove('selected-circle')
      document.getElementById('video-circle').classList.add('selected-circle')
    }
  }
  const turnOnChat = () => {
    if (document.getElementById('video-chat-main')) {
      document.getElementById('chat-main').style.display = 'inline'
      document.getElementById('video-chat-main').style.display = 'none'
      document
        .getElementById('video-circle')
        .classList.remove('selected-circle')
      document.getElementById('chat-circle').classList.add('selected-circle')
    }
  }

  const getIsLive = async () => {
    // Calling the API, using async and await is necessary
    if (concert_id) {
      // console.log("calling api");
      await API.graphql(
        graphqlOperation(queries.get_concert_is_live, {
          id: concert_id
        })
      ).then(data => {
        if (data.data.getConcert.is_live) {
          setIsLive(data.data.getConcert.is_live)
        }
      })
    }
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     getIsLive();
  //   }, 3000);
  // }, []);

  const paymentTabSelected = option => {
    if (option == 0) {
      setCreditSelected(true)
      setVenmoSelected(false)
      setPaypalSelected(false)
      document.getElementById('credit-tab').classList.add('selected-tab')
      document.getElementById('venmo-tab').classList.remove('selected-tab')
      document.getElementById('paypal-tab').classList.remove('selected-tab')
      document.getElementById('credit-tab-text').classList.add('selected-tab')
      document.getElementById('venmo-tab-text').classList.remove('selected-tab')
      document
        .getElementById('paypal-tab-text')
        .classList.remove('selected-tab')
    } else if (option == 1) {
      setCreditSelected(false)
      setVenmoSelected(true)
      setPaypalSelected(false)
      document.getElementById('venmo-tab').classList.add('selected-tab')
      document.getElementById('credit-tab').classList.remove('selected-tab')
      document.getElementById('paypal-tab').classList.remove('selected-tab')
      document.getElementById('venmo-tab-text').classList.add('selected-tab')
      document
        .getElementById('credit-tab-text')
        .classList.remove('selected-tab')
      document
        .getElementById('paypal-tab-text')
        .classList.remove('selected-tab')
    } else if (option == 2) {
      setCreditSelected(false)
      setVenmoSelected(false)
      setPaypalSelected(true)
      document.getElementById('paypal-tab').classList.add('selected-tab')
      document.getElementById('venmo-tab').classList.remove('selected-tab')
      document.getElementById('credit-tab').classList.remove('selected-tab')
      document.getElementById('paypal-tab-text').classList.add('selected-tab')
      document.getElementById('venmo-tab-text').classList.remove('selected-tab')
      document
        .getElementById('credit-tab-text')
        .classList.remove('selected-tab')
    }
  }

  const openTicketModal = () => {
    console.log('open ticket modal')
    setShowPaymentModal(true)
  }

  const closeAccessModal = () => {
    setShowAccessModal(false)
  }

  // Checks if email parameter is in the RSVP list for the concert
  const checkForAccess = async email => {
    const user_has_ticket = await didUserRSVP(concert_id, email);
    if (user_has_ticket) {
      setShowAccessModal(false)
      setAccessError(0)
    } else {
      setAccessError(1)
      console.log('this email does not have access!')
    }
  }

  // RENDERING SECTION
  return (
    <div className='stream-container'>
      {concert_info || !have_upcoming_concert ? (
        <div className='stream-page-content'>
          {width > 600 ? (
            <Grid className='desktop-stream-grid'>
              {show_access_modal ? (
                <AccessModal
                  access_list={concert_info.rsvp_list}
                  user_email={user_email}
                  openTicketModal={openTicketModal}
                  visible={show_access_modal}
                  onClose={closeAccessModal}
                  rsvp_list={concert_info.rsvp_list}
                  checkAccess={checkForAccess}
                  access_error={access_error}
                />
              ) : null}
              {show_payment_modal ? (
                <TicketModal
                  visible={show_payment_modal}
                  onClose={() => setShowPaymentModal(false)}
                  concert_info={concert_info}
                  auth={auth}
                  username={username}
                  user_email={user_email}
                  artist_name={concert_info.artist_name}
                  onTicketingComplete={() => setShowPaymentModal(false)}
                />
              ) : null}
              {open_modal ? (
                <Rodal
                  visible={open_modal}
                  onClose={closeModal}
                  width={100}
                  height={100}
                  measure='%'
                  customStyles={{
                    padding: 0,
                    overflow: scroll,
                    maxHeight: '545px',
                    maxWidth: '482px',
                    background:
                      'linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #07070F',
                    boxShadow:
                      '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px'
                  }}
                  className='rodal-custom'
                >
                  <Grid className='payment-modal-grid'>
                    <Row className='payment-modal-header'>
                      <Col size={1}>
                        <h4 className='payment-modal-header-text header-5'>
                          Donate to {concert_info.artist_name}
                        </h4>
                      </Col>
                    </Row>
                    <Row className='payment-modal-header'>
                      <Col
                        size={1}
                        className='payment-modal-tab selected-tab'
                        id='credit-tab'
                        onClick={() => paymentTabSelected(0)}
                      >
                        <span
                          className='payment-modal-tab-text subtitle-1 selected-tab'
                          id='credit-tab-text'
                        >
                          Credit Card
                        </span>
                      </Col>
                      <Col
                        size={1}
                        className='payment-modal-tab'
                        id='venmo-tab'
                        onClick={() => paymentTabSelected(1)}
                      >
                        <span
                          className='payment-modal-tab-text subtitle-1'
                          id='venmo-tab-text'
                        >
                          Venmo
                        </span>
                      </Col>
                      <Col
                        size={1}
                        className='payment-modal-tab'
                        id='paypal-tab'
                        onClick={() => paymentTabSelected(2)}
                      >
                        <span
                          className='payment-modal-tab-text subtitle-1'
                          id='paypal-tab-text'
                        >
                          Paypal
                        </span>
                      </Col>
                    </Row>
                  </Grid>
                  {(() => {
                    if (credit_selected) {
                      return (
                        <DonateCardBox
                          is_mobile={false}
                          concert_id={concert_id}
                        />
                      )
                    } else if (venmo_selected) {
                      return <VenmoBox is_mobile={false} />
                    } else {
                      return <PaypalBox is_mobile={false} />
                    }
                  })()}
                  {/* <DonateCardBox /> */}
                </Rodal>
              ) : null}

              {/* <Modal is_open={open_modal}></Modal> */}
              <Row className='desktop-stream-row'>
                {/* <Col size={0.5}></Col> */}
                <Col size={6} id='stream_col' className='stream-col'>
                  <div className='stream-main' id='stream_main_section'>
                    <div className='stream-wrapper' id='video_player'>
                      {/* {is_free ||
                      (purchasedTickets &&
                        purchasedTickets.indexOf(concert_id)) >= 0 ? (
                        <VideoPlayer
                          url={
                            'https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8'
                          }
                          start_time={
                            is_soundcheck
                              ? '2020-06-03T19:00:00.000-04: 00'
                              : show_start_time
                          }
                          artist_name={concert_info.artist_name}
                          // concert_name={concert_name}
                          auth={auth}
                          username={username}
                          concert_id={concert_id}
                          is_live={is_live}
                          stream_volume={stream_volume}
                          have_upcoming_concert={have_upcoming_concert}
                        />
                      ) : (
                        <div className='buy-ticket-message-container'>
                          <div className='buy-ticket-message-inner-top'>
                            <Row className='buy-ticket-message-row'>
                              <Col size={2}>
                                <img
                                  src={ticket1}
                                  className='buy-ticket-img'
                                ></img>
                              </Col>
                              <Col size={4} className='buy-ticket-text-col'>
                                <div className='buy-ticket-text-container'>
                                  <Row>
                                    <h4 className='buy-ticket-text'>
                                      It looks like your ticket is missing.
                                    </h4>
                                  </Row>
                                  <Row>
                                    <h5 className='buy-ticket-text'>
                                      Go get your ticket below!
                                    </h5>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <button
                            className='buy-ticket-redirect-button'
                            onClick={() =>
                              history.push('/upcoming/' + concert_id)
                            }
                          >
                            Get Ticket
                          </button>
                        </div>
                      )} */}
                       <VideoPlayer
                          url={
                            'https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8'
                          }
                          start_time={
                            is_soundcheck
                              ? '2020-06-03T19:00:00.000-04: 00'
                              : show_start_time
                          }
                          artist_name={concert_info.artist_name}
                          // concert_name={concert_name}
                          auth={auth}
                          username={username}
                          concert_id={concert_id}
                          is_live={is_live}
                          stream_volume={stream_volume}
                          have_upcoming_concert={have_upcoming_concert}
                        />
                      <div className='toggle-chat' id='chat_toggle_button'>
                        <button
                          className='toggle-chat-button'
                          onClick={toggleChat}
                        >
                          <i className={button_icon}></i>
                        </button>
                      </div>
                      <div
                        className='toggle-description'
                        id='description_toggle_button'
                      >
                        <button
                          className='toggle-description-button'
                          onClick={toggleDescription}
                        >
                          <i className={description_button_icon}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='stream-info-wrapper' id='stream_info_section'>
                    <Row className='stream-info-row'>
                      <Col size={1}>
                        <Row className='buttons-row' id='stream_info_top'>
                          <Col size={2}>
                            <div className='artist-name-container'>
                              <span className='header-5 artist-name-stream'>
                                {concert_info.artist_name}
                              </span>
                            </div>
                          </Col>
                          <Col size={3}>
                            <Row className='stream-share-row'>
                              <div className='viewers'>
                                <div className='viewers-container'>
                                  <img
                                    src={viewers_icon}
                                    className='stream-action-viewers'
                                  />
                                  <div className='segmented-button-text viewer-count'>
                                    {viewers}
                                  </div>
                                </div>
                              </div>
                              <div className='feedback-container'>
                                <a
                                  onClick={() =>
                                    Analytics.record({
                                      name: 'sendFeedbackClicked'
                                    })
                                  }
                                  href='https://forms.gle/5rP8nXznckGCuRE77'
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <img
                                    src={feedback_icon}
                                    className='stream-action-feedback'
                                  />
                                </a>
                              </div>
                              <ClickAwayListener onClickAway={closePopup}>
                                <div className='stream-action-button-container'>
                                  {/* <button
                                    className="stream-action-button"
                                    onClick={openPopup}
                                  >
                                    <i
                                      className="fa fa-share fa-fw stream-action-button-icon"
                                      aria-hidden="true"
                                    ></i>
                                    Share
                                  </button> */}
                                  <img
                                    src={share_icon}
                                    className='stream-action-share'
                                    onClick={openPopup}
                                  />

                                  <SharePopup show={show_popup} />
                                </div>
                              </ClickAwayListener>
                            </Row>
                          </Col>
                        </Row>
                        <Row className='artist-bio-row' id='artist_bio'>
                          <Col size={1}>
                            {/* <h5 className="show-time">
                              {show_time} (refresh the page if stream doesn't
                              show up)
                            </h5> */}
                            <div className='stream-artist-bio-container'>
                              <p className='body-2 stream-artist-bio'>
                                {artist_bio}
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row
                          className='bottom-buttons-row'
                          id='stream_info_bottom'
                        >
                          <Col size={1}>
                            <div className='social-media-container'>
                              <ul className='social-list'>
                                {concert_info.instagram ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: 'socialBarInsta'
                                        })
                                      }
                                      href={concert_info.instagram}
                                      className='fa fa-instagram'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <span>Instagram Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {concert_info.spotify ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: 'socialBarSpotify'
                                        })
                                      }
                                      href={concert_info.spotify}
                                      className='fab fa-spotify'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <span>Spotify Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {concert_info.youtube ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: 'socialBarYoutube'
                                        })
                                      }
                                      href={concert_info.youtube}
                                      className='fa fa-youtube'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <span>Youtube Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {concert_info.facebook ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: 'socialBarFacebook'
                                        })
                                      }
                                      href={concert_info.facebook}
                                      className='fab fa-facebook'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <span>Facebook Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {concert_info.twitter ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: 'socialBarTwitter'
                                        })
                                      }
                                      href={concert_info.twitter}
                                      className='fa fa-twitter'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <span>Twitter Link</span>
                                    </a>
                                  </li>
                                ) : null}

                                {concert_info.merch ? (
                                  <li>
                                    <a
                                      onClick={() =>
                                        Analytics.record({
                                          name: 'socialBarMerch'
                                        })
                                      }
                                      href={concert_info.merch}
                                      className='fas fa-shopping-cart'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <span>Merch Link</span>
                                    </a>
                                  </li>
                                ) : null}
                              </ul>
                            </div>
                          </Col>
                          {concert_id ===
                          '925d2552-7e18-4507-b293-89e4322be5fa' ? (
                            <div className='donate-button-column'>
                              <div className='stream-action-donate-container'>
                                <a
                                  href='https://onfour-media.s3.amazonaws.com/Hand+in+Hand+Texts+and+Translations.pdf'
                                  target='_blank'
                                >
                                  <span
                                    //content="DONATE"
                                    //onClick={openLyrics}
                                    disabled={!have_upcoming_concert}
                                    className='primary-button stream-lyrics-button segmented-button-text'
                                  >
                                    LYRICS
                                  </span>
                                </a>
                              </div>
                            </div>
                          ) : null}

                          {/* <Col size={1} className="donate-button-column"> */}
                          <div className='donate-button-column'>
                            <div className='stream-action-donate-container'>
                              <button
                                //content="DONATE"
                                onClick={donateModal}
                                disabled={!have_upcoming_concert}
                                className='primary-button stream-donate-button segmented-button-text'
                              >
                                DONATE
                              </button>
                            </div>
                          </div>
                          {/* <div className="stream-action-donate-container">
                              <button
                                //content="DONATE"
                                onClick={donateModal}
                                disabled={!have_upcoming_concert}
                                className="primary-button stream-donate-button segmented-button-text"
                              >
                                DONATE
                              </button>
                            </div>
                          </Col> */}
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col size={3} id='chat_container' className='sticky-container'>
                  <div className='chat-main' id='chat_main'>
                    <div className='chat-wrapper'>
                      <Row className='video-chat-row'>
                        <VideoChat
                          user_name={username ? username : 'GUEST'}
                          artist_name={artist_id}
                          stream_vol_adjust={setStreamVolume}
                          stream_volume_value={stream_volume}
                          video_chat_variables={video_chat_variables}
                        ></VideoChat>
                      </Row>
                      <Row className='chat-row'>
                        <Chat
                          chat_name={
                            username
                              ? username
                              : 'GUEST' +
                                (Math.floor(Math.random() * 99) + 9999)
                          }
                          chatStatus={chatStatus}
                          setViewers={getViewers}
                          // setguestid={getguestid}
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
            <div className='mobile-grid-stream'>
              <Rodal
                visible={open_modal}
                onClose={closeModal}
                width={96}
                height={100}
                measure='%'
                customStyles={{
                  padding: 0,
                  overflow: scroll,
                  maxHeight: '400px',
                  maxWidth: '350px',
                  background:
                    'linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #07070F',
                  boxShadow:
                    '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px'
                }}
                className='rodal-custom'
              >
                <Grid className='payment-modal-grid'>
                  <Row className='payment-modal-header'>
                    <Col size={1}>
                      <h4 className='payment-modal-header-text header-8'>
                        Donate to {concert_info.artist_name}
                      </h4>
                    </Col>
                  </Row>
                  <Row className='payment-modal-header'>
                    <Col
                      size={1}
                      className='payment-modal-tab selected-tab'
                      id='credit-tab'
                      onClick={() => paymentTabSelected(0)}
                    >
                      <span
                        className='payment-modal-tab-text subtitle-3 selected-tab'
                        id='credit-tab-text'
                      >
                        Credit Card
                      </span>
                    </Col>
                    <Col
                      size={1}
                      className='payment-modal-tab'
                      id='venmo-tab'
                      onClick={() => paymentTabSelected(1)}
                    >
                      <span
                        className='payment-modal-tab-text subtitle-3'
                        id='venmo-tab-text'
                      >
                        Venmo
                      </span>
                    </Col>
                    <Col
                      size={1}
                      className='payment-modal-tab'
                      id='paypal-tab'
                      onClick={() => paymentTabSelected(2)}
                    >
                      <span
                        className='payment-modal-tab-text subtitle-3'
                        id='paypal-tab-text'
                      >
                        Paypal
                      </span>
                    </Col>
                  </Row>
                </Grid>
                {(() => {
                  if (credit_selected) {
                    return <DonateCardBox is_mobile={true} />
                  } else if (venmo_selected) {
                    return <VenmoBox is_mobile={true} />
                  } else {
                    return <PaypalBox is_mobile={true} />
                  }
                })()}
              </Rodal>
              <div className='main-column-mobile'>
                <div className='mobile-row stream-main-mobile'>
                  <div className='stream-wrapper-mobile'>
                    <div className='viewers-mobile'>
                      <div className='viewers-container'>
                        <img
                          src={viewers_icon}
                          className='stream-action-viewers'
                        />
                        <div className='segmented-button-text viewer-count'>
                          {viewers}
                        </div>
                      </div>
                    </div>
                    {is_free ||
                    (purchasedTickets &&
                      purchasedTickets.indexOf(concert_id)) >= 0 ? (
                      <VideoPlayer
                        url={
                          'https://d20g8tdvm6kr0b.cloudfront.net/out/v1/474ceccf630440328476691e9bdeaeee/index.m3u8'
                        }
                        start_time={
                          is_soundcheck
                            ? '2020-06-03T19:00:00.000-04: 00'
                            : show_start_time
                        }
                        artist_name={concert_info.artist_name}
                        // concert_name={concert_name}
                        auth={auth}
                        username={username}
                        concert_id={concert_id}
                        is_live={is_live}
                        have_upcoming_concert={have_upcoming_concert}
                      />
                    ) : (
                      <div className='buy-ticket-message-container'>
                        <div className='buy-ticket-message-inner'>
                          <div className='buy-ticket-message-inner-top'>
                            <Row>
                              <Col size={2}>
                                <img
                                  src={ticket1}
                                  className='buy-ticket-img'
                                ></img>
                              </Col>
                              <Col size={4} className='buy-ticket-text-col'>
                                <div className='buy-ticket-text-container'>
                                  <Row>
                                    <h4 className='buy-ticket-text'>
                                      It looks like your ticket is missing.
                                    </h4>
                                  </Row>
                                  <Row>
                                    <h5 className='buy-ticket-text'>
                                      Go get your ticket below!
                                    </h5>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <button
                            className='buy-ticket-redirect-button'
                            onClick={() =>
                              history.push('/upcoming/' + concert_id)
                            }
                          >
                            Get Ticket
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='chat-main-mobile'>
                  <div className='chat-wrapper-mobile'>
                    <Chat
                      chat_name={
                        username
                          ? username
                          : 'GUEST' +
                            (Math.floor(Math.random() * 10000) + 10000)
                              .toString()
                              .substring(1)
                      }
                      chatStatus={chatStatus}
                      setViewers={getViewers}
                    />
                  </div>
                </div>
                <div className='payment-row-mobile'>
                  <button
                    className='stripe-button-border mobile-payment-button button-text'
                    // data-toggle="modal"
                    // data-target="#paymentModal"
                    onClick={donateModal}
                    disabled={!have_upcoming_concert}
                  >
                    DONATE
                  </button>
                  {/* <Modal isOpen={false}></Modal> */}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // <div className={!show_start_time ? 'parentDisable' : ''} width="100%">
        <div className='overlay-box'>
          <ScaleLoader
            sizeUnit={'px'}
            size={18}
            color={'#E465A2'}
            loading={!concert_info}
          />
        </div>
        // </div>
      )}
    </div>
  )
}

export default StreamPage
