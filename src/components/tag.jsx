import React, { useState } from "react";

const Tag = ({ content }) => {
  return (
    <div className="tag-body">
      <div className="tag-text">{content}</div>
    </div>
  );
};

export default Tag;
