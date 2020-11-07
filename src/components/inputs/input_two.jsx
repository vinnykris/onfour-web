import React, { useState, useEffect } from "react";

import "./input_two_styles.scss";
import eye from "../../images/icons/eye.png";
import { useWindowDimensions } from "../custom_hooks";

const InputTwo = ({
  id,
  type,
  name,
  is_required,
  value,
  placeholder,
  onChange,
  is_password,
  is_disabled,
}) => {
  const [hidden, setHidden] = useState("true");
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  return (
    is_password ? (
      <div className="input-two-container">
        {width > 600 ? (
          <div className="input-full-size">
            <input
              type={hidden ? "password" : "text"}
              name={name}
              id={id}
              required={is_required}
              value={value}
              onChange={onChange}
              className="input-two body-1"
              disabled={is_disabled}
              placeholder={placeholder}
            />
            <img
              src={eye}
              className="view-password"
              onClick={() => setHidden(!hidden)}
            />
            <span className="floating-label-two tag-text">{placeholder}</span>
          </div>
        ) : (
          <div className="input-full-size">
            <input
              type={hidden ? "password" : "text"}
              name={name}
              id={id}
              required={is_required}
              value={value}
              onChange={onChange}
              className="input-two body-3"
              disabled={is_disabled}
              placeholder={placeholder}
            />
            <img
              src={eye}
              className="view-password"
              onClick={() => setHidden(!hidden)}
            />
            <span className="floating-label-two mobile-tag-text">{placeholder}</span>
          </div>
        )}
      </div>
    ) : (
      <div className="input-two-container">
        {width > 600 ? (
          <div className="input-full-size">
            <input
              type={type}
              name={name}
              id={id}
              required={is_required}
              value={value}
              onChange={onChange}
              disabled={is_disabled}
              className="input-two body-1"
              placeholder={placeholder}
            />
            <span className="floating-label-two tag-text">{placeholder}</span>
          </div>
        ) : (
          <div className="input-full-size">
            <input
              type={type}
              name={name}
              id={id}
              required={is_required}
              value={value}
              onChange={onChange}
              disabled={is_disabled}
              className="input-two body-3"
              placeholder={placeholder}
            />
            <span className="floating-label-two mobile-tag-text">{placeholder}</span>
          </div>
        )}
      </div>
    )
  );
};

export default InputTwo;
