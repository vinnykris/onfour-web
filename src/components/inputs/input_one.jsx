import React, { useState, useEffect } from "react";

import "./input_one_styles.scss";
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
        <div className="input-one-container">
          {width > 600 ? (
            <div>
              <input
                type={hidden ? "password" : "text"}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                className="input-one body-1"
                disabled={is_disabled}
              />
              <img
                src={eye}
                className="view-password"
                onClick={() => setHidden(!hidden)}
              />
              <span className="floating-label body-1">{placeholder}</span>
            </div>
          ) : (
            <div>
              <input
                type={hidden ? "password" : "text"}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                className="input-one body-3"
                disabled={is_disabled}
              />
              <img
                src={eye}
                className="view-password"
                onClick={() => setHidden(!hidden)}
              />
              <span className="floating-label body-3">{placeholder}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="input-one-container">
          {width > 600 ? (
            <div>
              <input
                type={type}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                disabled={is_disabled}
                className="input-one body-1"
              />
              <span className="floating-label body-1">{placeholder}</span>
            </div>
          ) : (
            <div>
              <input
                type={type}
                name={name}
                id={id}
                required={is_required}
                value={value}
                onChange={onChange}
                disabled={is_disabled}
                className="input-one body-3"
              />
              <span className="floating-label body-3">{placeholder}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputOne;
