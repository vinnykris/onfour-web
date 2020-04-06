import React from "react";
import logo from "../images/onfour_logo.png";
import "../styles.scss";

const ContentHeader = ({ headerTitle }) => {
  return (
    <div className="featured-header">
      <div className="header-text">{headerTitle}</div>
    </div>
  );
};

export default ContentHeader;
