import React, { useState, useEffect } from "react";

import "./input_three_styles.scss";
import eye from "../../images/icons/eye.png";
import { useWindowDimensions } from "../custom_hooks";

const InputThreeWide = ({
  id,
  type,
  name,
  is_required,
  value,
  label,
  placeholder,
  onChange,
  is_disabled,
}) => {
  const [hidden, setHidden] = useState("true");
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  return (
    <div className="input-three-container">
        {width > 600 ? (
        <div className="input-full-size">
            <span className="fixed-label segmented-button-text">{label}</span>
            {/* <input
            type={type}
            name={name}
            id={id}
            required={is_required}
            value={value}
            onChange={onChange}
            disabled={is_disabled}
            placeholder={placeholder}
            className="input-three body-1"
            /> */}
            <textarea
            className="input-three body-1 padding-20-10"
            type={type}
            name={name}
            id={id}
            required={is_required}
            value={value}
            onChange={onChange}
            disabled={is_disabled}
            placeholder={placeholder}
            />
        </div>
        ) : (
        <div className="input-full-size">
            <span className="fixed-label mobile-button-text">{label}</span>
            <textarea
            className="input-three body-3 padding-20-10"
            type={type}
            name={name}
            id={id}
            required={is_required}
            value={value}
            onChange={onChange}
            disabled={is_disabled}
            placeholder={placeholder}
            />
            {/* <input
            type={type}
            name={name}
            id={id}
            required={is_required}
            value={value}
            onChange={onChange}
            disabled={is_disabled}
            placeholder={placeholder}
            className="input-three body-3"
            /> */}
        </div>
        )}
    </div>
  );
};

export default InputThreeWide;
