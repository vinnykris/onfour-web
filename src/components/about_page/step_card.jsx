import React, { useState, useEffect } from "react";

import { useWindowDimensions } from "../custom_hooks";
import "./step_card_styles.scss";

const StepCard = ({ title, description, step_num }) => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  return (
    <div className="step-card-container">
      {width > 600 ? (
        <div>
          <div className="step-card-number">
            <div className="ellipse">
              <span className="header-3 step-num-text">{step_num}</span>
            </div>
          </div>
          <div className="step-card-text">
            <div className="header-4">{title}</div>
            <div className="subtitle-2 step-card-description">
              {description}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="step-card-number">
            <div className="ellipse">
              <span className="header-4 step-num-text">{step_num}</span>
            </div>
          </div>
          <div className="step-card-text">
            <div className="header-6">{title}</div>
            <div className="subtitle-3 step-card-description">
              {description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;
