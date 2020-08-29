// Main Imports
import React, { useState, useEffect } from "react";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

// Styling Imports
import "./about_styles.scss";

// Image imports
import wave_blue from "../../images/backgrounds/wave_1.svg";
import artist_background from "../../images/backgrounds/artist_info.png";
import fan_background from "../../images/backgrounds/fan_info.png";
import ReactPlayer from "react-player";

//Amplify.configure(awsmobile);

// AboutPage component that contains all the about page layout
const LandingPage = () => {
  const [show_artist, setShowArtist] = useState(true);
  return (
    <div className="about-page-content">
      <div className="about-section">
        <div className="background-about-container">
          <img src={wave_blue} className="wave" />
        </div>
      </div>
      <div className="about-section experience-section">
        <div className="background-about-container">
          {show_artist ? (
            <div className="background-about-inner">
              <img src={artist_background} className="info-card" />
              <span className="header-4 tab-title artist-tab">
                I'm an artist
              </span>
              <span
                className="header-4 tab-title fan-tab not-selected"
                onClick={() => setShowArtist(!show_artist)}
              >
                I'm a fan
              </span>
              <div className="experience-video-wrapper">
                <ReactPlayer
                  className="experience-video"
                  url="https://youtu.be/82UqPEJyxZQ"
                  width="88.333%"
                  height="88.333%"
                />
              </div>
            </div>
          ) : (
            <div className="background-about-inner">
              <img src={fan_background} className="info-card" />
              <span
                className="header-4 tab-title artist-tab not-selected"
                onClick={() => setShowArtist(!show_artist)}
              >
                I'm an artist
              </span>
              <span className="header-4 tab-title fan-tab">I'm a fan</span>
              <div className="experience-video-wrapper">
                <ReactPlayer
                  className="experience-video"
                  url="https://youtu.be/82UqPEJyxZQ"
                  width="88.333%"
                  height="88.333%"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="about-section how-it-works-section">
        <div className="header-2">How It Works</div>
        <div className="step-card-container">
          <div className="step-card"></div>
          <div className="step-card"></div>
          <div className="step-card"></div>
        </div>
      </div>

      <div className="about-section feature-section">
        <div className="header-2">This Isn't Just Another Livestream</div>
        <div className="feature-card-container">
          <div className="feature-row">
            <div className="feature-card"></div>
            <div className="feature-card"></div>
            <div className="feature-card"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
