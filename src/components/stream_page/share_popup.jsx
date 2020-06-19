import React, { Component } from "react";
import { Grid } from "../grid";

import Tooltip from "@material-ui/core/Tooltip";

import "./popup_styles.scss";

const SharePopup = ({ show }) => {
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
                className="fa fa-twitter twitter-share-button"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/intent/tweet?text=Come%20watch%20a%20concert%20with%20me&url=https%3A%2F%2Fonfour.live%2Fstream"
                data-text="Come watch a concert with me!"
                data-url="https://www.onfour.live/stream"
                data-lang="en"
                data-show-count="false"
              >
                <span>Twitter Link</span>
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
              ></script>
            </li>
            <li>
              <Tooltip title="Copy to clipboard">
                <span
                  onClick={() => {
                    navigator.clipboard.writeText("https://onfour.live/stream");
                  }}
                >
                  <i className="fa fa-clone">
                    <span>Copy Link</span>
                  </i>
                </span>
              </Tooltip>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SharePopup;
