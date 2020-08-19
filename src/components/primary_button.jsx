import React from "react";

const PrimaryButton = ({ content, action }) => {
  return (
    <button className="primary-button button-text" onClick={action}>
      {content}
    </button>
  );
};

export default PrimaryButton;
