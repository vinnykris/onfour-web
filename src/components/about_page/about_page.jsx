// Main Imports
import React, { useState, useEffect } from "react";
import history from "../../history";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

import { useWindowDimensions } from "../custom_hooks";
// Styling Imports
import "./about_styles.scss";

// Image imports
import wave_blue from "../../images/backgrounds/wave_1.svg";
import artist_background from "../../images/backgrounds/artist_info.png";
import fan_background from "../../images/backgrounds/fan_info.png";
import mobile_artist_background from "../../images/backgrounds/mobile_artist_info.png";
import mobile_fan_background from "../../images/backgrounds/mobile_fan_info.png";
import features_background from "../../images/backgrounds/features_background.png";
import ReactPlayer from "react-player";
import StepCard from "./step_card";
import FeatureCard from "./feature_card";

//Amplify.configure(awsmobile);

// AboutPage component that contains all the about page layout
const LandingPage = () => {
  const [show_artist, setShowArtist] = useState(false);
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  return (
    <div className="about-page-content">
      {width > 600 ? (
        <div>
          <div className="about-section">
            {/* <div className="background-about-container">
                    <img src={wave_blue} className="wave" />
                </div> */}
            <div
              className={
                "about-main-container" +
                (show_artist ? "" : " fans-main-container-background")
              }
            >
              <div className="about-text-container">
                <div className="about-main-header header-2">
                  Experience music, together.
                </div>
                <div className="about-main-subheading header-4">
                  Interactive live-streamed concerts with your friends.
                </div>
              </div>
            </div>
          </div>
          <div className="about-section experience-section">
            <div className="background-about-container">
              {show_artist ? (
                <div className="background-about-inner">
                  <img src={artist_background} className="info-card" />
                  <div className="tab-titles">
                    <span
                      className="header-4 tab-title fan-tab not-selected"
                      onClick={() => setShowArtist(!show_artist)}
                    >
                      I'm a fan
                    </span>
                    <span className="header-4 tab-title artist-tab">
                      I'm an artist
                    </span>
                  </div>
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
                  <div className="tab-titles">
                    <span className="header-4 tab-title fan-tab">
                      I'm a fan
                    </span>
                    <span
                      className="header-4 tab-title artist-tab not-selected"
                      onClick={() => setShowArtist(!show_artist)}
                    >
                      I'm an artist
                    </span>
                  </div>
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
            {show_artist ? (
              <div className="step-card-section">
                <div className="step-card-row">
                  <StepCard
                    title="Schedule"
                    description="Pick a date, set your ticket price, and promote with an RSVP link."
                    step_num="1"
                  />
                  <StepCard
                    title="Soundcheck"
                    description="Plug in and join our greenroom with tech support the whole way."
                    step_num="2"
                  />
                  <StepCard
                    title="Perform"
                    description="See and interact with your fans as if they were in the room with you."
                    step_num="3"
                  />
                </div>
              </div>
            ) : (
              <div className="step-card-section">
                <div className="step-card-row">
                  <StepCard
                    title="Create a Crew"
                    description="Invite your friends to join your crew and attend shows with them."
                    step_num="1"
                  />
                  <StepCard
                    title="Pick a Show"
                    description="RSVP, add it to your calendar, and invite your crew to join you."
                    step_num="2"
                  />
                  <StepCard
                    title="Enjoy the Show"
                    description="Interact with your crew while watching your favorite artist live."
                    step_num="3"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="about-section feature-section">
            {/* <div className="background-about-container feature-wave-bkgd">
          <img src={features_background} className="wave-2" />
        </div> */}
            {show_artist ? (
              <div className="feature-content-container">
                <div className="header-2">
                  This Isn't Just Another Livestream
                </div>
                <div className="feature-card-section">
                  <div className="feature-row">
                    <FeatureCard
                      title="Perform for Fans, Not the Camera"
                      description="No more isolation! See your fans dance and sing along as you perform."
                    />
                    <FeatureCard
                      title="Personalized Setup and Support"
                      description="We'll handle the dirty work so you can focus on what matters most: the music."
                    />
                    <FeatureCard
                      title="Virtual Meet & Greets"
                      description="Connect with your biggest fans after the show, either 1-to-1 or in small groups."
                    />
                    {/* </div>
                  <div className="feature-row"> */}
                    <FeatureCard
                      title="Your Ticket, Your Price"
                      description="Set your ticket price and get paid for your performance like you deserve."
                    />
                    <FeatureCard
                      title="Sell More Merch"
                      description="No more long lines. Direct your fans to your merch 'table' at the click of a button."
                    />
                    <FeatureCard
                      title="Create Your Own Lineup"
                      description="Cross-promote by inviting your friends and other artists to perform with you."
                    />
                  </div>
                </div>
                <div className="sign-up-container">
                  <button
                    className="primary-button button-text sign-up-button"
                    onClick={() => history.push("/register")}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            ) : (
              <div className="feature-content-container">
                <div className="header-2">
                  The Ultimate Digital Concert Experience
                </div>
                <div className="feature-card-section">
                  <div className="feature-row">
                    <FeatureCard
                      title="Watch with Friends"
                      description="Enjoy the show with your crew or head into the crowd to chat with other fans."
                    />
                    <FeatureCard
                      title="Be Seen on the Jumbotron"
                      description="Artists can see and hear their fans, one crew at a time."
                    />
                    <FeatureCard
                      title="A New Kind of Backstage Pass"
                      description="Meet your favorite artists after the show, either with your crew or 1-to-1."
                    />
                    {/* </div>
                  <div className="feature-row"> */}
                    <FeatureCard
                      title="Quality Worth Plugging In For"
                      description="Put on your headphones or plug in your favorite speakers. Your ears will thank you."
                    />
                    <FeatureCard
                      title="Now That's a Fire Pregame"
                      description="Jam out to our featured playlist before the artist takes the stage."
                    />
                    <FeatureCard
                      title="Thanks for the Memories"
                      description="Collect ticket stubs for each show that you attend. Relive your favorites with recordings."
                    />
                  </div>
                </div>
                <div className="sign-up-container">
                  <button
                    className="primary-button button-text sign-up-button"
                    onClick={() => history.push("/register")}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="about-mobile">
          <div className="about-section">
            {/* <div className="background-about-container">
            <img src={wave_blue} className="wave" />
        </div> */}
            <div
              className={
                "about-main-container" +
                (show_artist ? "" : " fans-main-container-background")
              }
            >
              <div className="about-text-container">
                <div className="about-main-header header-4">
                  Experience music, together.
                </div>
                <div className="about-main-subheading subtitle-1">
                  Interactive live-streamed concerts with your friends.
                </div>
              </div>
            </div>
          </div>
          <div className="about-section experience-section">
            <div className="background-about-container">
              {show_artist ? (
                <div className="background-about-inner">
                  <img src={mobile_artist_background} className="info-card" />
                  <div className="tab-titles">
                    <span
                      className="header-8 tab-title fan-tab not-selected"
                      onClick={() => setShowArtist(!show_artist)}
                    >
                      I'm a fan
                    </span>
                    <span className="header-8 tab-title artist-tab">
                      I'm an artist
                    </span>
                  </div>
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
                  <img src={mobile_fan_background} className="info-card" />
                  <div className="tab-titles">
                    <span className="header-8 tab-title fan-tab">
                      I'm a fan
                    </span>
                    <span
                      className="header-8 tab-title artist-tab not-selected"
                      onClick={() => setShowArtist(!show_artist)}
                    >
                      I'm an artist
                    </span>
                  </div>
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
            <div className="header-5">How It Works</div>
            {show_artist ? (
              <div className="step-card-section">
                <StepCard
                  title="Schedule"
                  description="Pick a date, set your ticket price, and promote with an RSVP link."
                  step_num="1"
                />
                <StepCard
                  title="Soundcheck"
                  description="Plug in and join our greenroom with tech support the whole way."
                  step_num="2"
                />
                <StepCard
                  title="Perform"
                  description="See and interact with your fans as if they were in the room with you."
                  step_num="3"
                />
              </div>
            ) : (
              <div className="step-card-section">
                <StepCard
                  title="Create a Crew"
                  description="Invite your friends to join your crew and attend shows with them."
                  step_num="1"
                />
                <StepCard
                  title="Pick a Show"
                  description="RSVP, add it to your calendar, and invite your crew to join you."
                  step_num="2"
                />
                <StepCard
                  title="Enjoy the Show"
                  description="Interact with your crew while watching your favorite artist live."
                  step_num="3"
                />
              </div>
            )}
          </div>

          <div className="about-section feature-section">
            {/* <div className="background-about-container feature-wave-bkgd">
  <img src={features_background} className="wave-2" />
</div> */}
            {show_artist ? (
              <div className="feature-content-container">
                <div className="header-7">
                  This Isn't Just Another Livestream
                </div>
                <div className="feature-card-section">
                  <FeatureCard
                    title="Perform for Fans, Not the Camera"
                    description="No more isolation! See your fans dance and sing along as you perform."
                  />
                  <FeatureCard
                    title="Personalized Setup and Support"
                    description="We'll handle the dirty work so you can focus on what matters most: the music."
                  />
                  <FeatureCard
                    title="Virtual Meet & Greets"
                    description="Connect with your biggest fans after the show, either 1-to-1 or in small groups."
                  />
                  <FeatureCard
                    title="Your Ticket, Your Price"
                    description="Set your ticket price and get paid for your performance like you deserve."
                  />
                  <FeatureCard
                    title="Sell More Merch"
                    description="No more long lines. Direct your fans to your merch 'table' at the click of a button."
                  />
                  <FeatureCard
                    title="Create Your Own Lineup"
                    description="Cross-promote by inviting your friends and other artists to perform with you."
                  />
                </div>
                <div className="sign-up-container">
                  <button
                    className="primary-button button-text sign-up-button"
                    onClick={() => history.push("/register")}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            ) : (
              <div className="feature-content-container">
                <div className="header-7">
                  The Ultimate Digital Concert Experience
                </div>
                <div className="feature-card-section">
                  <FeatureCard
                    title="Watch with Friends"
                    description="Enjoy the show with your crew or head into the crowd to chat with other fans."
                  />
                  <FeatureCard
                    title="Be Seen on the Jumbotron"
                    description="Artists can see and hear their fans, one crew at a time."
                  />
                  <FeatureCard
                    title="A New Kind of Backstage Pass"
                    description="Meet your favorite artists after the show, either with your crew or 1-to-1."
                  />
                  <FeatureCard
                    title="Quality Worth Plugging In For"
                    description="Put on your headphones or plug in your favorite speakers. Your ears will thank you."
                  />
                  <FeatureCard
                    title="Now That's a Fire Pregame"
                    description="Jam out to our featured playlist before the artist takes the stage."
                  />
                  <FeatureCard
                    title="Thanks for the Memories"
                    description="Collect ticket stubs for each show that you attend. Relive your favorites with recordings."
                  />
                </div>
                <div className="sign-up-container">
                  <button
                    className="primary-button button-text sign-up-button"
                    onClick={() => history.push("/register")}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default LandingPage;
