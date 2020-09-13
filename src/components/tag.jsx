import React, { useState } from "react";

const Tag = ({ content, is_mobile }) => {
  return (
    <div className="tag-body">
      {is_mobile ? (
        <div className="mobile-tag-text">{content}</div>
      ) : (
        <div className="tag-text">{content}</div>
      )}
      
    </div>
  );
};

export default Tag;
