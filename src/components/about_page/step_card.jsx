import React, { useState, useEffect } from "react";
import "./step_card_styles.scss";

const StepCard = ({ title, description, step_num }) => {
  return (
    <div className="step-card-container">
      <div className="step-card-number">
        <div className="ellipse">
          <span className="header-3 step-num-text">{step_num}</span>
        </div>
      </div>
      <div className="step-card-text">
        <div className="header-4">{title}</div>
        <div className="subtitle-2 step-card-description">{description}</div>
      </div>
    </div>
  );
};

export default StepCard;
