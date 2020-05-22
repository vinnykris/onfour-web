// React Imports
import React, { useState, useEffect } from "react";

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
import { Grid, Row, Col } from "../grid";
import "./upcoming_show_page_styles.scss";



// const UpcomingShowPage = () => {
//   return (
//     <div className="upcoming-show-page-content">
//       <Modal></Modal>
//       <Grid className="upcoming-show-grid">
//         <Row className="search-bar">
//           <Col size= {1}>
//             <p>{new Date().toLocaleString()}</p>
//           </Col>
//           <Col size={1}>
//             <p>{Date.now()}</p>
//           </Col>
//           <Col size={1}>
//             <p>{+new Date("2020-06-04") - +new Date()}</p>
//           </Col>
//         </Row>
//         <Row>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={jon_may_10}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//         </Row>
//         <Row>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//         </Row>
//         <Row>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//           <div class="col-md-4">
//             <FeaturedContent
//               img={concert}
//               name={"Jonathan Dely"}
//               concert_name={"Mother's Day Concert"}
//               date={"Sunday | 20 May 2020"}
//               month={"MAY"}
//               day={10}
//               time={"8PM EST"}
//             />
//           </div>
//         </Row>
//       </Grid>
//     </div>
//   );
// };

// export default UpcomingShowPage;


const UpcomingShowPage = () => {
  const [videos, setVideos] = useState([
    <FeaturedContent
      img={jon_may_10}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />,
    <FeaturedContent
      img={concert}
      name={"Jonathan Dely"}
      concert_name={"Mother's Day Concert"}
      date={"Sunday | 20 May 2020"}
      month={"MAY"}
      day={10}
      time={"8PM EST"}
    />
  ]); // List of video objects with past show information

  useEffect(() => {
    // DO API CALL HERE
    // TEMPORARILY HARD CODE LIST
  }, []);
  return (
    <div className="upcoming-show-page-content">
      <Modal></Modal>
      <SearchBar></SearchBar>
      <div className="upcoming-show-grid">
        <FlexibleGrid content_list={videos} num_cols={3} />
      </div>
    </div>
  );
}

export default UpcomingShowPage;