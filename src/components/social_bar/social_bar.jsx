// React
import React from "react";

// Styles
import "./social_bar_styles.scss";

// AWS
import { Analytics } from "aws-amplify";

// Export SocialBar Component, which contains the links/icons for the social
// media pages for the performing musician
const SocialBar = ({
  show_text,
  instagram,
  spotify,
  youtube,
  facebook,
  twitter,
  merch,
}) => {
  return (
    <div className="social-media">
      {show_text ? (
        <p className="social-subscribe-description">
          Follow us on social media to stay informed:
        </p>
      ) : null}

      <ul className="social-list">
        {instagram ? (
          <li>
            <a
              onClick={() => Analytics.record({ name: "socialBarInsta" })}
              href={instagram}
              className="fa fa-instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Instagram Link</span>
            </a>
          </li>
        ) : null}

        {spotify ? (
          <li>
            <a
              onClick={() => Analytics.record({ name: "socialBarSpotify" })}
              href={spotify}
              className="fab fa-spotify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Spotify Link</span>
            </a>
          </li>
        ) : null}

        {youtube ? (
          <li>
            <a
              onClick={() => Analytics.record({ name: "socialBarYoutube" })}
              href={youtube}
              className="fa fa-youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Youtube Link</span>
            </a>
          </li>
        ) : null}

        {facebook ? (
          <li>
            <a
              onClick={() => Analytics.record({ name: "socialBarFacebook" })}
              href={facebook}
              className="fab fa-facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Facebook Link</span>
            </a>
          </li>
        ) : null}

        {twitter ? (
          <li>
            <a
              onClick={() => Analytics.record({ name: "socialBarTwitter" })}
              href={twitter}
              className="fa fa-twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Twitter Link</span>
            </a>
          </li>
        ) : null}

        {merch ? (
          <li>
            <a
              onClick={() => Analytics.record({ name: "socialBarMerch" })}
              href={merch}
              className="fas fa-shopping-cart"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Merch Link</span>
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default SocialBar;
