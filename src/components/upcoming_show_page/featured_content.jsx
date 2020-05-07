import React from "react";
import "./upcoming_show_page_styles.scss";

const FeaturedContent = ({ img }) => {
  return (
    <div className="featured-content">
      <img className="feature-placeholder" src={img} alt="content-img"></img>
    </div>
  );
};

export default FeaturedContent;
