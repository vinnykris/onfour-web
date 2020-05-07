import React from "react";
import "./upcoming_show_page_styles.scss";

const MonthHeader = ({ headerTitle }) => {
  return (
    <div className="featured-header">
      <h2 className="header-text">{headerTitle}</h2>
    </div>
  );
};

export default MonthHeader;
