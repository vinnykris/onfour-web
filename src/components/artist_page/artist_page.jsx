// Main Imports
import React, { useEffect } from "react";
import { Grid, Row, Col } from "../grid";

// Image Imports
import onboarding_1 from "../../images/icons/onboarding_artist_1.png";
import onboarding_2 from "../../images/icons/onboarding_artist_2.png";
import onboarding_3 from "../../images/icons/onboarding_artist_3.png";
import onboarding_4 from "../../images/icons/onboarding_artist_4.png";
import onboarding_5 from "../../images/icons/onboarding_artist_5.png";

//AWS Imports
import Amplify, { Analytics } from "aws-amplify";
import Auth from "../../apis/UserPool";

// Styling Imports
import "./artist_styles.scss";

// Artist component that contains the features we provide to artists
const ArtistPage = () => {
  // Add in analytics that arist page was visited
  useEffect(() => {
    artistPageVisit();
  }, []);
  const artistPageVisit = () => {
    Analytics.record({ name: "totalArtistPageVisits" });
  };

  // Record in analytics that artist page was visited only if user is logged in
  useEffect(() => {
    Auth.currentAuthenticatedUser({}).then((user) => {
      authenticatedArtistPageVisit();
    });
  }, []);
  const authenticatedArtistPageVisit = () => {
    Analytics.record({ name: "totalAuthenticatedArtistPageVisits" });
  };

  return (
    <div className="artist-page-content">
      {/* DESKTOP LAYOUT */}
      <Grid className="desktop-grid-artist">
        <Row className="onboarding-row">
          <Col size={1}>
            <div className="artist-page-text">
              <h2 className="onboarding-header">Your Music Comes First.</h2>
              <p className="onboarding-description">
                Look and sound your best. Make sure that your fans can see and
                hear you the way you want. Livestream with pristine audio and
                video quality by plugging in with your audio interface and
                mixer.
              </p>
            </div>
          </Col>
          <Col size={1}>
            <img
              src={onboarding_5}
              className="artist-page-img"
              alt="focus-on-music"
            />
          </Col>
        </Row>
        <Row className="onboarding-row">
          <Col size={1}>
            <img
              src={onboarding_2}
              className="artist-page-img"
              alt="easy-setup"
            />
          </Col>
          <Col size={1}>
            <div className="artist-page-text">
              <h2 className="onboarding-header">Setting Up Made Easy.</h2>
              <p className="onboarding-description">
                Get direct tech support, with a personal touch for setting up
                and streaming. Our team will walk you through the setup process
                to make sure you look and sound your best.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="onboarding-row">
          <Col size={1}>
            <div className="artist-page-text">
              <h2 className="onboarding-header">Make Money Your Way.</h2>
              <p className="onboarding-description">
                Streaming 24/7 doesn't make sense for artists. Ticket your
                shows, set your own prices, and receive donations. We allow you
                to pick how you want to monetize your show in ways that work for
                you.
              </p>
            </div>
          </Col>
          <Col size={1}>
            <img
              src={onboarding_4}
              className="artist-page-img"
              alt="make-money"
            />
          </Col>
        </Row>
        <Row className="onboarding-row">
          <Col size={1}>
            <img
              src={onboarding_1}
              className="artist-page-img"
              alt="connect-with-fans"
            />
          </Col>
          <Col size={1}>
            <div className="artist-page-text">
              <h2 className="onboarding-header">Connect With Your Fans.</h2>
              <p className="onboarding-description">
                Join the chat and communicate with your audience in real-time.
                Answer their questions, shout out fans you know, and feel the
                love. Our team doesn't miss a show - we will help moderate and
                make sure everyone is having a good time.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="onboarding-row">
          <Col size={1}>
            <div className="artist-page-text">
              <h2 className="onboarding-header">Own Your Recorded Content.</h2>
              <p className="onboarding-description">
                Record your show for free in high definition audio and video
                quality so that you can cherish the moment and use it as
                promotional material, or provide it to fans as exclusive content
                after the show.
              </p>
            </div>
          </Col>
          <Col size={1}>
            <img
              src={onboarding_3}
              className="artist-page-img"
              alt="high-quality-performance"
            />
          </Col>
        </Row>
      </Grid>
      {/* MOBILE LAYOUT */}
      <Grid className="mobile-grid-artist">
        <div className="onboarding-section-mobile">
          <Row>
            <Col size={1}>
              <img
                src={onboarding_5}
                className="artist-page-img"
                alt="focus-on-music"
              />
            </Col>
          </Row>
          <Row>
            <Col size={1}>
              <div className="artist-page-text">
                <h2 className="onboarding-header">Your Music Comes First.</h2>
                <p className="onboarding-description">
                  Look and sound your best. Make sure that your fans can see and
                  hear you the way you want. Livestream with pristine audio and
                  video quality by plugging in with your audio interface and
                  mixer.
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="onboarding-section-mobile">
          <Row>
            <Col size={1}>
              <img
                src={onboarding_2}
                className="artist-page-img"
                alt="easy-setup"
              />
            </Col>
          </Row>
          <Row>
            <Col size={1}>
              <div className="artist-page-text">
                <h2 className="onboarding-header">Setting Up Made Easy.</h2>
                <p className="onboarding-description">
                  Get direct tech support, with a personal touch for setting up
                  and streaming. Our team will walk you through the setup
                  process to make sure you look and sound your best.
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="onboarding-section-mobile">
          <Row>
            <Col size={1}>
              <img
                src={onboarding_4}
                className="artist-page-img"
                alt="make-money"
              />
            </Col>
          </Row>
          <Row>
            <Col size={1}>
              <div className="artist-page-text">
                <h2 className="onboarding-header">Make Money Your Way.</h2>
                <p className="onboarding-description">
                  Streaming 24/7 doesn't make sense for artists. Ticket your
                  shows, set your own prices, and receive donations. We allow
                  you to pick how you want to monetize your show in ways that
                  work for you.
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="onboarding-section-mobile">
          <Row>
            <Col size={1}>
              <img
                src={onboarding_1}
                className="artist-page-img"
                alt="connect-with-fans"
              />
            </Col>
          </Row>
          <Row>
            <Col size={1}>
              <div className="artist-page-text">
                <h2 className="onboarding-header">Connect With Your Fans.</h2>
                <p className="onboarding-description">
                  Join the chat and communicate with your audience in real-time.
                  Answer their questions, shout out fans you know, and feel the
                  love. Our team doesn't miss a show - we will help moderate and
                  make sure everyone is having a good time.
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="onboarding-section-mobile">
          <Row>
            <Col size={1}>
              <img
                src={onboarding_3}
                className="artist-page-img"
                alt="high-quality-performance"
              />
            </Col>
          </Row>
          <Row>
            <Col size={1}>
              <div className="artist-page-text">
                <h2 className="onboarding-header">
                  Own Your Recorded Content.
                </h2>
                <p className="onboarding-description">
                  Record your show for free in high definition audio and video
                  quality so that you can cherish the moment and use it as
                  promotional material, or provide it to fans as exclusive
                  content after the show.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Grid>
    </div>
  );
};
export default ArtistPage;
