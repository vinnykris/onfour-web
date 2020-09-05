import React from "react";
import { useEffect } from "react";

const PrimaryButton = ({ content, action, className }) => {
  useEffect(() => {}, []);

  return (
    <button className={"primary-button " + className} onClick={action}>
      {content}
    </button>
  );
};

export default PrimaryButton;
