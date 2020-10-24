import React, { useState, useEffect } from "react";

import "./input_three_styles.scss";
import eye from "../../images/icons/eye.png";
import { useWindowDimensions } from "../custom_hooks";

const InputOne = ({
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
    <div>
      {is_password ? (
        <div className="input-three-container">
          {width > 600 ? (
            <div>
              <span className="fixed-label segmented-button-text">{placeholder}</span>
              <input
                type={hidden ? "password" : "text"}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                className="input-three body-1"
                disabled={is_disabled}
              />
              <img
                src={eye}
                className="view-password-three"
                onClick={() => setHidden(!hidden)}
              />
            </div>
          ) : (
            <div>
              <span className="fixed-label mobile-button-text">{placeholder}</span>
              <input
                type={hidden ? "password" : "text"}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                className="input-three body-3"
                disabled={is_disabled}
              />
              <img
                src={eye}
                className="view-password-three"
                onClick={() => setHidden(!hidden)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="input-three-container">
          {width > 600 ? (
            <div>
              <span className="fixed-label segmented-button-text">{placeholder}</span>
              <input
                type={type}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                disabled={is_disabled}
                className="input-three body-1"
              />
            </div>
          ) : (
            <div>
              <span className="fixed-label mobile-button-text">{placeholder}</span>
              <input
                type={type}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                disabled={is_disabled}
                className="input-three body-3"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputOne;
