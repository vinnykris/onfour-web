// React Imports
import React, { useState, useEffect } from "react";
import { View } from "react-native";

// Component Imports
import FeaturedContent from "./featured_content";
import SearchBar from "../search_bar/search_bar";
import Modal from "../payment/ticket_modal";
import FlexibleGrid from "../flexible_grid/flexible_grid";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import Amplify from "aws-amplify";
import awsmobile from "../../apis/AppSync";

// Styling Imports
import "./upcoming_show_page_styles.scss";

Amplify.configure(awsmobile);

// The Upcoming Show Page component
const UpcomingShowPage = () => {
  // concerts is a list of FeaturedContent objects with upcoming show information
  const [concerts, setConcerts] = useState([]);

  // getConcertInfo queries all elements in the future concert database
  // and create a list of FeaturedContent objects with the data returned
  // from the database.
  const getConcertInfo = async () => {
    // Calling the API, using async and await is necessary
    const info = await API.graphql(
      graphqlOperation(queries.list_upcoming_concerts)
    );

    const info_list = info.data.listFutureConcerts.items; // Stores the items in database
    info_list.sort((a, b) => a.timePassed - b.timePassed);
    console.log(info_list);
    const month_map = {
      "01": "JAN",
      "02": "FEB",
      "03": "MAR",
      "04": "APR",
      "05": "MAY",
      "06": "JUN",
      "07": "JUL",
      "08": "AUG",
      "09": "SEP",
      "10": "OCT",
      "11": "NOV",
      "12": "DEC"
    };
    const day_map = {
      "Sat": "Sunday", 
      "Sun": "Monday", 
      "Mon": "Tuesday", 
      "Tue": "Wednesday", 
      "Wed": "Thursday", 
      "Thu": "Friday", 
      "Fri": "Saturday"
    };

    // Iterate through each element in the list and add the created
    // FeaturedContent to concerts
    info_list.forEach((data) => {
      const day_in_week = new Date(data.date).toString();
      setConcerts(concerts => [
        ...concerts,
        <FeaturedContent
          img={data.url}
          name={data.artist}
          concert_name={data.concertName}
          week_day={day_map[day_in_week.slice(0,3)]}
          date={data.date.slice(8, 10) + " " + month_map[data.date.slice(5, 7)] + " " + data.date.slice(0, 4)}
          month={month_map[data.date.slice(5,7)]}
          day={data.date.slice(8,10)}
          time={data.time}
          ticketed={data.price}
        />,
      ]);
    });
  };

  useEffect(() => {
    getConcertInfo();
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
        {/* <SearchBar></SearchBar> */}
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
};

export default UpcomingShowPage;
