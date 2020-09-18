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
          <h1 className={"not-found-page-oops-heading " + (width > 600 ? "header-2" : "header-4")}>Don't Panic!</h1>
          <h3 className={"not-found-page-oops-error-text " + (width > 600 ? "header-8" : "subtitle-3")}>
            {"You found a rare 404 page in a different dimension \nShare your discovery with friends!"}
          </h3>
          <div className="not-found-page-button-wrapper">
            <div className="mobile-footer-social-media">
              <ul className="social-list">
                <li>
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
                </li>
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
                    onClick={() =>
                      Analytics.record({
                        name: "404Youtube",
                      })
                    }
                    href="https://www.youtube.com/channel/UCwbWryexV1632eZ_pILnmTQ/featured"
                    className="fa fa-youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Youtube Link</span>
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
                    onClick={() =>
                      Analytics.record({
                        name: "socialBarTwitter",
                      })
                    }
                    href="https://twitter.com/_Onfour"
                    className="fa fa-twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Twitter Link</span>
                  </a>
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
