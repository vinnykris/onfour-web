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
import ScaleLoader from "react-spinners/ScaleLoader";

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
import home_background from "../../images/backgrounds/home-page-background.jpeg";
import no_concert_img from "../../images/backgrounds/no_concert.jpg";

// Styling Imports
import "./home_styles.scss";
import FeaturedConcertBox from "./featured_concert_box";

Amplify.configure(awsmobile);

// HomePage component that contains all the home page layout
const HomePage = () => {
  const [email, setEmail] = useState(""); // Variable to store input emails for subscribtion form
  const [clicked, setClicked] = useState(false); // Variable to show hide the subscribtion form
  // concerts is a list of FeaturedContent objects with upcoming show information
  const [concerts, setConcerts] = useState([]);
  const [most_recent_concert, setMostRecentConcert] = useState("");
  const [most_recent_concert_artist, setMostRecentConcertArtist] = useState("");
  const [videos, setVideos] = useState([]); // List of video objects with past show information
  const [no_concert, setNoConcert] = useState(false);

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
    window.scroll({ top: height * section_number, behavior: "smooth" });
  };

  // Add in Analytics that home page was visited
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

      if (recent_concert) {
        const artist_info = await getArtistInfo(recent_concert.artist_id);
        setMostRecentConcertArtist(artist_info);
      } else {
        setNoConcert(true);
      }
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
    <div className="home-page-content">
      {width > 600 ? (
        // {/* DESKTOP LAYOUT */}
        most_recent_concert_artist ? (
          <Grid className="desktop-grid-home">
            {/* BANNER ROW */}
            <Row className="banner-row">
              <div className="banner-container">
                <img
                  src={most_recent_concert.poster_url}
                  className="home-page-featured"
                />
                <div className="home-page-overlay" />
                <div className="featured-concert-container">
                  <Row className="upcoming-row">
                    <FeaturedConcertBox
                      artist_info={most_recent_concert_artist}
                      concert_info={most_recent_concert}
                    />
                  </Row>
                </div>
              </div>
            </Row>

            <Row>
              <Col size={1}>
                <div className="home-preview-content">
                  <Row className="header-row">
                    <Col size={1}>
                      <span className="preview-content-header header-5">
                        Upcoming Shows
                      </span>
                    </Col>
                    <Col size={1}>
                      <NavLink to="/upcoming">
                        <span className="view-all header-7">View All</span>
                      </NavLink>
                    </Col>
                  </Row>
                  <Row>
                    <FlexibleGrid
                      className="preview-flex-row"
                      content_list={concerts}
                      num_cols={4}
                    />
                  </Row>
                </div>
              </Col>
            </Row>
          </Grid>
        ) : (
          <div>
            {no_concert ? (
              <Grid className="desktop-grid-home">
                {/* BANNER ROW */}
                <Row className="banner-row">
                  <div className="banner-container">
                    <img src={no_concert_img} className="home-page-featured" />
                    <div className="empty-upcoming-container">
                      <span className="preview-content-header header-5 empty-upcoming">
                        We don't have any scheduled shows at the moment, but
                        stay tuned!
                      </span>
                    </div>
                  </div>
                </Row>
              </Grid>
            ) : (
              <div className="overlay-box">
                <ScaleLoader
                  sizeUnit={"px"}
                  size={18}
                  color={"#E465A2"}
                  loading={!most_recent_concert_artist}
                />
              </div>
            )}
          </div>
        )
      ) : (
        // {/* MOBILE LAYOUT */}
        <Grid className="mobile-grid-home">
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
                        <p className="subscribe-success home-success">
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
export default HomePage;
