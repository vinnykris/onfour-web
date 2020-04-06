import React from "react";
import "../styles.scss";

const ContentHeader = ({ headerTitle }) => {
  return (
    <div className="featured-header">
      <h6 className="header-text">{headerTitle}</h6>
    </div>
  );
};

export default ContentHeader;
