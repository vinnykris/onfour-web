import React from "react";
import "../styles.scss";

const ContentHeader = ({ headerTitle }) => {
  return (
    <div className="featured-header">
      <h5 className="header-text">{headerTitle}</h5>
    </div>
  );
};

export default ContentHeader;
