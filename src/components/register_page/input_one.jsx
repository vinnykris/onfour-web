import React, { useState, useEffect } from "react";

import "./input_one_styles.scss";

const InputOne = ({
  id,
  type,
  name,
  is_required,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="input-one-container">
      <input
        type={type}
        name={name}
        id={id}
        required={is_required}
        value={value}
        onChange={onChange}
        className="input-one body-1"
      />
      <span className="floating-label body-1">{placeholder}</span>
    </div>
  );
};

export default InputOne;
