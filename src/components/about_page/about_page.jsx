// Main Imports
import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "../grid";
import history from "../../history";
import { NavLink } from "react-router-dom";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

// Component Imports
import FlexibleGrid from "../flexible_grid/flexible_grid";
import { useWindowDimensions } from "../custom_hooks";
import PulseLoader from "react-spinners/PulseLoader";

// API Imports
import {
  getConcertInfo,
  getArchiveInfo,
  getMostRecentUpcomingInfo,
  getArtistInfo,
} from "../../apis/get_concert_data";

import { formatArchiveVideos, formatUpcomingShow } from "../util";

// Image Imports
// import gradient_header from "../../images/mobile_gradient.png";

// Styling Imports
import "./about_styles.scss";

Amplify.configure(awsmobile);

// AboutPage component that contains all the about page layout
const AboutPage = () => {
  const [email, setEmail] = useState(""); // Variable to store input emails for subscribtion form
  const [clicked, setClicked] = useState(false); // Variable to show hide the subscribtion form
  // concerts is a list of FeaturedContent objects with upcoming show information
  const [concerts, setConcerts] = useState([]);
  const [most_recent_concert, setMostRecentConcert] = useState("");
  const [most_recent_concert_artist, setMostRecentConcertArtist] = useState("");
  const [videos, setVideos] = useState([]); // List of video objects with past show information

  // DETERMINE MOBILE VERSION OR NOT
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true); // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: "10px", behavior: "smooth" });
    setScroll(false);
  }

  const scrollDown = (section_number) => {
    console.log("heyhey");
    window.scroll({ top: height * section_number, behavior: "smooth" });
  };

  // Add in Analytics that about page was visited
  useEffect(() => {
    aboutPageVisit();
    Auth.currentAuthenticatedUser({}).then((user) => {
      authenticatedAboutPageVisit();
    });
  }, []);
  const aboutPageVisit = () => {
    Analytics.record({ name: "totalaboutPageVisits" });
  };
  // Record in analytics that about page was visited only if user is logged in
  const authenticatedAboutPageVisit = () => {
    Analytics.record({ name: "totalAuthenticatedAboutPageVisits" });
  };

  // This function gets called when the email subscribtion form is submitted
  // It calls the appsync API to send the input email to backend database
  const emailSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      paid: false, //paid is initialized to be false
    };

    API.graphql(
      graphqlOperation(mutations.create_email_subscription, { input: payload })
    );

    setEmail("");
    setClicked(true);
  };

  // This function gets called when user clicked the "Send us an email"
  // It will open a mailbox with onfour.box@gmail.com as the receiver
  const sendEmail = () => {
    const url = "mailto:onfour.box@gmail.com";
    window.open(url, "_blank");
  };

  const getUpcomingFull = async (data) => {
    const artist_id = data.artist_id;
    const artist_info = await getArtistInfo(artist_id);
    let merged = { ...data, ...artist_info };
    return merged;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Upcoming shows
      var full_concerts = [];
      const upcoming_result = await getConcertInfo();
      for await (const data of upcoming_result.slice(0, 4)) {
        full_concerts.push(formatUpcomingShow(await getUpcomingFull(data)));
      }
      setConcerts(full_concerts);

      // Archive videos (sorting from most recent -> oldest)
      const archive_result = await getArchiveInfo();
      setVideos(formatArchiveVideos(archive_result.slice(0, 4)));

      const recent_concert = await getMostRecentUpcomingInfo();
      setMostRecentConcert(recent_concert);

      const artist_info = await getArtistInfo(recent_concert.artist_id);
      setMostRecentConcertArtist(artist_info);
    };
    fetchData();
  }, []);

  // ADD ANIMATION TO CSS BASED ON SCROLL AMOUNT
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (document.getElementById("section2-text")) {
        const scrollCheck_top_section2 = window.scrollY > height / 2;
        const scrollCheck_bottom_section2 = window.scrollY > height;

        if (scrollCheck_top_section2 && !scrollCheck_bottom_section2) {
          // if the scroll amount is larger than view height to increase opacity
          document.getElementById("section2-text").style.opacity =
            ((window.scrollY - height / 2) / height) * 2;
        } else if (scrollCheck_bottom_section2 && window.scrollY < height * 2) {
          document.getElementById("section2-text").style.opacity =
            1 - ((window.scrollY - height) / height) * 2;
          document.getElementById("why-perform-text-container").style.left =
            -34 + 54 / ((window.scrollY - height) / height) + "%";
          document.getElementById("why-perform-text-container").style.opacity =
            (window.scrollY - height) / height;
        }
      }
    });
  });

  // Analytics and redirect for clicking "go to venue" button
  const goToVenue = (event) => {
    Analytics.record({ name: "goToVenue" });
    history.push("/stream");
  };

  // Analytics and redirect for clicking "learn more" button
  const learnMore = (event) => {
    Analytics.record({ name: "learnMoreClicked" });
    history.push("/artists");
  };

  return (
    <div className="about-page-content">
      {/* {!most_recent_concert ? (
        <div className="about-page-loading-background">
          <div className="about-page-loader">
            <PulseLoader
              sizeUnit={"px"}
              size={18}
              color={"#4878fa"}
              loading={!most_recent_concert}
            ></PulseLoader>
          </div>
        </div>
      ) : (
      <div> */}
      {width > 600 ? (
        // {/* DESKTOP LAYOUT */}
        <Grid className="desktop-grid-about">
          {/* BANNER ROW */}
          <Row className="banner-row">
            <div className="banner-container">
              {/* <img
                className="banner-header-desktop"
                src={header_image_url}
                alt="nav-logo"
              ></img> */}
              <video
                className="banner-video"
                data-src="https://onfour-media.s3.amazonaws.com/website+component/banner_video_guitar.mp4"
                loop
                autoPlay
                muted
                volume="0"
                src="https://onfour-media.s3.amazonaws.com/website+component/banner_video_guitar.mp4"
              ></video>
              <Row className="header-tag-row">
                <Col>
                  <Row>
                    <span className="header-tag">REIMAGINING</span>
                  </Row>
                  <Row>
                    <span className="header-tag">LIVE</span>
                  </Row>
                  <Row>
                    <span className="header-tag">MUSIC.</span>
                  </Row>
                </Col>
              </Row>
              <Row className="upcoming-row">
                <Col className="upcoming-col">
                  <Row>
                    <span className="upcoming-header-tag">UP NEXT</span>
                  </Row>
                  <Row>
                    <div className="upcoming-description">
                      {most_recent_concert_artist
                        ? most_recent_concert_artist.artist_name +
                          " - " +
                          most_recent_concert.concert_name
                        : "loading..."}
                    </div>
                  </Row>
                  <Row className="upcoming-button-container">
                    <button className="upcoming-button" onClick={goToVenue}>
                      GO TO VENUE
                    </button>
                  </Row>
                </Col>
              </Row>
              <Row>
                <p
                  className="fa fa-chevron-down go-down-button"
                  onClick={() => scrollDown(1)}
                ></p>
              </Row>
            </div>
          </Row>
          <Row className="view-height-row">
            <Col size={12}>
              <p className="description-text" id="section2-text">
                Onfour is the premier live-streaming concert platform. We are
                redefining what it means to experience live music digitally and
                are dedicated to empowering artists to connect with fans in new,
                meaningful ways.
                {/* Onfour is the premier live-streaming concert platform, built and
                designed for musicians. We are dedicated to empowering musicians
                and enabling them to connect with fans in new, meaningful ways.
                Experience studio-like quality from the comfort of your own home.
                <br></br>
                <br></br>
                Due to the COVID-19 pandemic, we are hosting live-stream concerts
                and will donate all of our proceeds to{" "}
                <a
                  href="https://www.grammy.com/musicares/donations"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MusiCares
                </a>{" "}
                to help relieve musicians during this difficult time. */}
              </p>
              {/* <Row>
                <Col size={1}>
                  <button
                    onClick={() => history.push("/stream")}
                    className="button-on-black"
                  >
                    Tune into the stream!
                  </button>
                </Col>
              </Row> */}
            </Col>
            <Row>
              <p
                className="fa fa-chevron-down go-down-button"
                onClick={() => scrollDown(2)}
              ></p>
            </Row>
          </Row>
          <Row className="view-height-row why-perform-about">
            <Row
              className="why-perform-text-container"
              id="why-perform-text-container"
            >
              <Col>
                <Row>
                  <div className="why-perform-title">Perform with onfour</div>
                </Row>
                <Row>
                  <div className="why-perform-text">
                    {
                      "Provide your fans with a better live experience: \nPlug in with your audio interface and mixer. \nTicket your shows, set your own prices, and receive tips. \nChat with your fans in real-time. \nRecord your full show for free in high definition. \nReal-time tech support for setting up and streaming."
                    }
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="why-perform-learn-more-row">
              <button
                className="why-perform-learn-more-button"
                onClick={learnMore}
              >
                LEARN MORE
              </button>
            </Row>
            <Row className="why-perform-image-container">
              <img
                className="why-perform-image"
                src={"https://onfour-media.s3.amazonaws.com/singing+photo.jpg"}
                alt="singer"
              ></img>
            </Row>
            <Row>
              <p
                className="fa fa-chevron-down go-down-button"
                onClick={() => scrollDown(3)}
              ></p>
            </Row>
          </Row>
          <Row>
            <Col size={1}>
              <div className="about-preview-content">
                <Row>
                  <Col size={1}>
                    <h4 className="preview-content-header">UPCOMING</h4>
                  </Col>
                  <Col size={1}>
                    <NavLink to="/upcoming">
                      <span className="view-all">VIEW ALL</span>
                    </NavLink>
                  </Col>
                </Row>
                <Row>
                  {/* {width <= 1024 ? (
                    <FlexibleGrid
                      className="preview-flex-row"
                      content_list={concerts}
                      num_cols={4}
                    />
                  ) : (
                      <FlexibleGrid
                        className="preview-flex-row"
                        content_list={concerts}
                        num_cols={5}
                      />
                    )} */}
                  <FlexibleGrid
                    className="preview-flex-row"
                    content_list={concerts}
                    num_cols={4}
                  />
                </Row>
                <Row className="archive-preview-row">
                  <Col size={1}>
                    <h4 className="preview-content-header">PAST SHOWS</h4>
                  </Col>
                  <Col size={1}>
                    <NavLink to="/archive">
                      <span className="view-all">VIEW ALL</span>
                    </NavLink>
                  </Col>
                </Row>
                <Row>
                  <FlexibleGrid content_list={videos} num_cols={4} />
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      ) : (
        // {/* MOBILE LAYOUT */}
        <Grid className="mobile-grid-about">
          <div className="main-content-mobile">
            {/* MISSION ROW */}
            <div className="mobile-section">
              <Row>
                <Col size={1}>
                  <h3 className="header-mobile"> Our Mission </h3>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <p className="description-text-mobile">
                    Onfour is the premier live-streaming concert platform. We
                    are redefining what it means to experience live music
                    digitally and are dedicated to empowering artists to connect
                    with fans in new, meaningful ways.
                  </p>
                </Col>
              </Row>
            </div>

            {/* SUBSCRIBE ROW */}
            <div className="mobile-section">
              <Row>
                <Col size={1}>
                  <h3 className="header-mobile">Subscribe</h3>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <p className="description-text-mobile">
                    To stay informed about upcoming events,<br></br> subscribe
                    to our mailing list:
                  </p>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  {(() => {
                    if (clicked) {
                      return (
                        <p className="subscribe-success about-success">
                          Thank you and stay tuned!
                        </p>
                      );
                    } else {
                      return (
                        <form
                          className="inline-form-2"
                          action="/"
                          id="newsletter"
                          onSubmit={emailSubmit}
                        >
                          <Row>
                            <Col size={4}>
                              <input
                                type="email"
                                placeholder="Enter email here..."
                                name="email"
                                required
                                value={email}
                                className="email-input"
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                              />
                            </Col>
                            <Col size={1}>
                              <button
                                type="submit"
                                form="newsletter"
                                value="Submit"
                                className="submit-button button-border button-height"
                              >
                                Submit
                              </button>
                            </Col>
                          </Row>
                        </form>
                      );
                    }
                  })()}
                </Col>
              </Row>
            </div>

            {/* PERFORM ROW */}
            <div className="mobile-section">
              <Row>
                <Col size={1}>
                  <Row>
                    <Col size={1}>
                      <h3 className="header-mobile">Perform</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={1}>
                      <p className="description-text-mobile">
                        Want to perform a livestream concert with Onfour?{" "}
                        <br></br>
                        Send us an email and we will get back to you soon!
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={1}>
                      <button
                        type="submit"
                        form="newsletter"
                        value="Submit"
                        className="email-button-mobile button-border button-height"
                        onClick={sendEmail}
                      >
                        Send us an email
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Grid>
      )}
      {/* //   </div>
    // )} */}
    </div>
  );
};
export default AboutPage;
