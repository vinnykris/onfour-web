// React Imports
import React, { useState, useEffect } from "react";
import { View } from "react-native";

// Component Imports
import FeaturedContent from "./featured_content";
import SearchBar from "../search_bar/search_bar";
import Modal from "../payment/ticket_modal";
import FlexibleGrid from "../flexible_grid/flexible_grid";

// Image Imports
import jon_may_10 from "../../images/upcoming_shows/Jon_may10_cropped.jpg";
import concert from "../../images/upcoming_shows/concert_placeholder.jpeg";

// AWS Imports
// import * as mutations from "../../graphql/mutations";
// import { API, graphqlOperation } from "aws-amplify";

// Styling Imports
import "./upcoming_show_page_styles.scss";

// The Upcoming Show Page component
const UpcomingShowPage = () => {
  // List of FeaturedContent objects with upcoming show information
  const [concerts, setConcerts] = useState([
    <FeaturedContent
      img={jon_may_10}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={false}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={true}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={false}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={false}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={true}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={true}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={true}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={true}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
      ticketed={true}
    />
  ]); 
  useEffect(() => {
    // DO API CALL HERE
    // TEMPORARILY HARD CODE LIST
  }, []);

  const [is_mobile, setIsMobile] = useState(false); // If mobile should be rendered
  // Gets dimensions of screen and sends warnings to console
  const findDimensions = (layout) => {
    const { x, y, width, height } = layout;
    if (width < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.warn(height);
  };

  return (
    <View
      onLayout={(event) => {
        findDimensions(event.nativeEvent.layout);
      }}
    >
      <div className="upcoming-show-page-content">
        <Modal></Modal>
        <SearchBar></SearchBar>
        {!is_mobile ? (
          <div className="upcoming-show-grid">
            <FlexibleGrid content_list={concerts} num_cols={3} />
          </div>
        ) : (
            <div className="upcoming-show-grid">
              <FlexibleGrid content_list={concerts} num_cols={1} />
            </div>
        )}
      </div>
    </View>
  );
}

export default UpcomingShowPage;