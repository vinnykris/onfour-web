// React

import React from "react";
// Styles
import "./social_bar_styles.scss";

// Export SocialBar Component, which contains the links/icons for the social
// media pages for the performing musician
const SocialBar = () => {
  return (
    <div className="social-media">
      <p className="social-subscribe-description">
        Follow us on social media to stay informed:
      </p>
      <ul className="social-list">
        <li>
          <a
            href="https://www.instagram.com/_onfour"
            class="fa fa-instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram Link</span>
          </a>
        </li>
        <li>
          <a
            href="https://open.spotify.com/playlist/3KbuKf1zti8EtbJ4Ot7Iq4"
            class="fa fa-spotify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Spotify Link</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCwbWryexV1632eZ_pILnmTQ"
            class="fa fa-youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Youtube Link</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/onfour"
            class="fa fa-facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Facebook Link</span>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/_Onfour"
            class="fa fa-twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Twitter Link</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialBar;
