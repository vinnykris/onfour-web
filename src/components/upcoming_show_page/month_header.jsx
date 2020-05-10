import React from "react";
import "./upcoming_show_page_styles.scss";

const MonthHeader = ({ headerTitle }) => {
  return (
    <div className="featured-header">
      <h1 className="header-text">{headerTitle}</h1>
    </div>
  );
};

export default MonthHeader;
