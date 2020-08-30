import React, { useState, useEffect } from "react";
import "./step_card_styles.scss";

const StepCard = ({ title, description }) => {
  return (
    <div className="step-card-container">
      <div className="step-card-text">
        <div className="header-4">{title}</div>
        <div className="subtitle-2 step-card-description">{description}</div>
      </div>
    </div>
  );
};

export default StepCard;
