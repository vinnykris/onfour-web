// React Imports
import React, { useState, useEffect } from "react";

// Component Imports
import FeaturedContent from "./featured_content";
import SearchBar from "../search_bar/search_bar";
import FlexibleGrid from "../flexible_grid/flexible_grid";
import { useWindowDimensions } from "../custom_hooks";
import { createChunks, formatUpcomingShows } from "../util";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

// API Imports
import { getConcertInfo } from "../../apis/get_concert_data";

// Styling Imports
import "./upcoming_show_page_styles.scss";

Amplify.configure(awsmobile);

// The Upcoming Show Page component
const UpcomingShowPage = () => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  const [formatted_concerts, setFormattedConcerts] = useState([]);
  const [scroll, setScroll] = useState(true); // State Variable for auto scroll to the top
  // Auto scroll to the top on page load
  if (scroll) {
    window.scrollTo({ top: 0 });
    setScroll(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      // Upcoming shows
      const upcoming_result = await getConcertInfo();
      console.log(upcoming_result);
      setFormattedConcerts(formatUpcomingShows(upcoming_result, width));
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
      {width <= 600 ? (
        <div className="upcoming-show-grid">
          <FlexibleGrid content_list={formatted_concerts} num_cols={1} />
        </div>
      ) : (
        <div>
          {width <= 1024 ? (
            <div className="upcoming-show-grid">
              <FlexibleGrid content_list={formatted_concerts} num_cols={3} />
            </div>
          ) : (
            <div className="upcoming-show-grid">
              <FlexibleGrid content_list={formatted_concerts} num_cols={4} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingShowPage;
