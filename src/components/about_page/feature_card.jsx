import React, { useState, useEffect } from "react";
import "./feature_card_styles.scss";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature-card-container">
      <div className="header-6 feature-card-title">{title}</div>
      <div className="feature-card-description-container">
        <div className="subtitle-2 feature-card-description">{description}</div>
      </div>
    </div>
  );
};

export default FeatureCard;
