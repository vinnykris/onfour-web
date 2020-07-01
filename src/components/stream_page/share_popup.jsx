import React, { useEffect, useState } from "react";

import Tooltip from "@material-ui/core/Tooltip";

import "./popup_styles.scss";

import { Analytics } from "aws-amplify";

const SharePopup = ({ show }) => {
  const [tooltip_text, setTooltipText] = useState("");

  // When tooltip "shown" value is changed, change tooltip text to default
  useEffect(() => {
    setTooltipText("Copy to clipboard");
  }, [show]);

  // If copy to clipboard button is clicked, change tooltip text and copy stream page link
  // Record analytics for click as well
  const copyToClipboard = () => {
    Analytics.record({ name: "copyClipboardShareClicked" });
    navigator.clipboard.writeText("https://onfour.live/stream");
    setTooltipText("Copied!");
  };

  return (
    <div>
      {show ? (
        <div className="popup-overlay">
          <ul className="social-list">
            <li>
              <a
                onClick={Analytics.record({ name: "facebookShareClicked" })}
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
                onClick={Analytics.record({ name: "twitterShareClicked" })}
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
              <Tooltip title={tooltip_text}>
                <span onClick={copyToClipboard}>
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
