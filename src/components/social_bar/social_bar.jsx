// React
import React from "react";
// Styles
import "./social_bar_styles.scss";

// Export SocialBar Component, which contains the links/icons for the social
// media pages for the performing musician
const SocialBar = () => {
  return (
    <div className="social-media">
      <ul className="social-list">
        <li>
          <a
            href="http://instagram.com/jonathan_dely"
            class="fa fa-instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram Link</span>
          </a>
        </li>
        <li>
          <a
            href="https://open.spotify.com/artist/5wdmp3H2QC7tfMYAabtQN3"
            class="fa fa-spotify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Spotify Link</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCdh0zQFUEYKQsbTJI00Q2SA"
            class="fa fa-youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Youtube Link</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/jonathandelymusic"
            class="fa fa-facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Facebook Link</span>
          </a>
        </li>
        <li>
          <a
            href="http://paypal.me/jonathandely"
            class="fa fa-paypal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Paypal Link</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialBar;
