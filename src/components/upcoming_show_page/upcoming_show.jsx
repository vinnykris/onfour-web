// React Imports
import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

// Component Imports
// import FeaturedContent from "./featured_content";
// import SearchBar from "../search_bar/search_bar";
import FlexibleGrid from "../flexible_grid/flexible_grid";
import { useWindowDimensions } from "../custom_hooks";
import { formatUpcomingShow } from "../util";

// AWS Imports
// import { API, graphqlOperation } from "aws-amplify";
// import * as queries from "../../graphql/queries";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

// API Imports
import { getArtistInfo, getConcertInfo } from "../../apis/get_concert_data";

// Styling Imports
import "./upcoming_show_page_styles.scss";

// Image Imports
import background_img from "../../images/backgrounds/backgorund_image1-03-03.png";

Amplify.configure(awsmobile);

// The Upcoming Show Page component
const UpcomingShowPage = () => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  const [formatted_concerts, setFormattedConcerts] = useState([]);
  const [scroll, setScroll] = useState(true); // State Variable for auto scroll to the top
  const [is_loaded, setIsLoaded] = useState(false);
  const [have_upcoming_concert, setHaveUpcomingConcert] = useState(false);
  // Auto scroll to the top on page load
  if (scroll) {
    window.scrollTo({ top: 0 });
    setScroll(false);
  }

  const getUpcomingFull = async (data) => {
    //console.log(data);
    const artist_id = data.artist_id;
    const artist_info = await getArtistInfo(artist_id);
    let merged = { ...data, ...artist_info };
    console.log(merged);
    return merged;
  };

  useEffect(() => {
    const fetchData = async () => {
      var full_concerts = [];
      // Upcoming shows
      const upcoming_result = await getConcertInfo();
      for await (const data of upcoming_result) {
        //console.log(data);
        full_concerts.push(formatUpcomingShow(await getUpcomingFull(data)));
      }
      setFormattedConcerts(full_concerts);
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  // Get Concert Info and Record in Analytics that Upcoming show page was viewed
  useEffect(() => {
    upcomingShowVisit();
    Auth.currentAuthenticatedUser({}).then((user) => {
      authenticatedUpcomingPageVisit();
    });
  }, []);
  const upcomingShowVisit = () => {
    Analytics.record({ name: "totalUpcomingPageVisits" });
  };

  // Record in analytics that upcoming show page was visited only if user is logged in
  const authenticatedUpcomingPageVisit = () => {
    Analytics.record({ name: "totalAuthenticatedUpcomingPageVisits" });
  };

  return (
    <div className="upcoming-show-page-content">
      <img className="upcoming-page-background-img" src={background_img}></img>
      {is_loaded ? (
        <div>
          {width <= 600 ? (
            <div className="upcoming-show-grid">
              <FlexibleGrid content_list={formatted_concerts} num_cols={1} />
            </div>
          ) : (
            <div>
              {width < 1280 ? (
                <div>
                  {width <= 800 ? (
                    <div className="upcoming-show-grid">
                      <FlexibleGrid
                        content_list={formatted_concerts}
                        num_cols={3}
                      />
                    </div>
                  ) : (
                    <div className="upcoming-show-grid">
                      <FlexibleGrid
                        content_list={formatted_concerts}
                        num_cols={4}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="upcoming-show-grid">
                  {formatted_concerts.length > 0 ? (
                    <FlexibleGrid
                      content_list={formatted_concerts}
                      num_cols={4}
                    />
                  ) : (
                    <div className="header-5 empty-upcoming">
                      We don't have any scheduled shows at the moment, but stay
                      tuned!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="overlay-box">
          <ScaleLoader
            sizeUnit={"px"}
            size={18}
            color={"#E465A2"}
            loading={!is_loaded}
          />
        </div>
      )}
    </div>
  );
};

export default UpcomingShowPage;
