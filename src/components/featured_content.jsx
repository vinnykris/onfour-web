import React from "react";
import "../styles.scss";

const FeaturedContent = ({ img }) => {
  return (
    <div className="featured-content">
      <img className="feature-placeholder" src={img} alt="content-img"></img>
    </div>
  );
};

export default FeaturedContent;
