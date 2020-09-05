import React, { useState, useEffect } from "react";

import "./input_one_styles.scss";
import eye from "../../images/icons/eye.png";

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
  return (
    <div>
      {is_password ? (
        <div className="input-one-container">
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
        <div className="input-one-container">
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
      )}
    </div>
  );
};

export default InputOne;
