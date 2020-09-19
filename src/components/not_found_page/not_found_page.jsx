import "../not_found_page/not_found_page_style.scss";
import { useWindowDimensions } from "../custom_hooks";
//AWS
import { Analytics } from "aws-amplify";

var React = require("react");

const NotFoundPage = () => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  return (
    <div className="not-found-page">
      <img
        src="https://onfour-media.s3.amazonaws.com/website+component/404+without+text.jpg"
        className="not-found-page-img404"
      />
      <div className="not-found-page-container">
        <div className="not-found-page-text">
          <h1
            className={
              "not-found-page-oops-heading " +
              (width > 600 ? "header-2" : "header-4")
            }
          >
            Don't Panic!
          </h1>
          <h3
            className={
              "not-found-page-oops-error-text " +
              (width > 600 ? "header-8" : "subtitle-3")
            }
          >
            {
              "You found a rare 404 page in a different dimension. \nShare your discovery with friends!"
            }
          </h3>
          <div className="not-found-page-button-wrapper">
            <div className="mobile-footer-social-media">
              <ul className="social-list">
                {/* <li>
                  <a
                    onClick={() =>
                      Analytics.record({
                        name: "404Insta",
                      })
                    }
                    href="https://www.instagram.com/_onfour/"
                    className="fa fa-instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Instagram Link</span>
                  </a>
                </li> */}
                {/* <li>
                  <a
                    onClick={() =>
                      Analytics.record({
                        name: "404Spotify",
                      })
                    }
                    href={artist_spotify}
                    className="fab fa-spotify"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Spotify Link</span>
                  </a>
                </li> */}
                <li>
                  <a
                    onClick={Analytics.record({ name: "facebookShareClicked" })}
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fonfour.live%2F${window.location.href.substring(
                      window.location.href.lastIndexOf("/") + 1
                    )}&amp;src=sdkpreparse`}
                    className="fa fa-facebook-official fb-xfbml-parse-ignore"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Facebook Link</span>
                  </a>
                </li>
                {/* <li>
                  <a
                    onClick={() =>
                      Analytics.record({
                        name: "404Facebook",
                      })
                    }
                    href={artist_fb}
                    className="fab fa-facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Facebook Link</span>
                  </a>
                </li> */}
                <li>
                  <a
                    onClick={Analytics.record({ name: "twitterShareClicked" })}
                    className="fa fa-twitter twitter-share-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet?text=You%20wont%20believe%20what%20I%20found...&url=https%3A%2F%2Fonfour.live%2F${window.location.href.substring(
                      window.location.href.lastIndexOf("/") + 1
                    )}`}
                    data-text="You won't believe what I just found..."
                    // data-url="https://www.onfour.live/stream"
                    data-url={window.location.href}
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
