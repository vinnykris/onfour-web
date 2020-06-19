import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Grid } from "../grid";

import "./popup_styles.scss";

const SharePopup = ({ show }) => {
  const copyToClipboard = () => {};
  console.log(show);
  return (
    <div>
      {show ? (
        <div className="popup-overlay">
          <ul className="social-list">
            <li>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.onfour.live%2Fstream&amp;src=sdkpreparse"
                className="fa fa-facebook-official fb-xfbml-parse-ignore"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Facebook Link</span>
              </a>
            </li>
            <li>
              <a
                // href="https://twitter.com/_Onfour"
                className="fa fa-twitter twitter-share-button"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/intent/tweet?text=Come%20watch%20a%20concert%20with%20me&url=https%3A%2F%2Fonfour.live%2Fstream"
                // target="_blank"
                // class="twitter-share-button"
                data-text="Come watch a concert with me!"
                data-url="https://www.onfour.live/stream"
                data-lang="en"
                data-show-count="false"
              >
                {/* <link rel="canonical" href="/web/tweet-button"></link> */}
                <span>Twitter Link</span>
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
              ></script>
            </li>
            <li>
              <span
                onClick={() => {
                  navigator.clipboard.writeText("https://onfour.live/stream");
                }}
              >
                <i className="fa fa-clone">
                  <span>Copy Link</span>
                </i>
              </span>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SharePopup;
