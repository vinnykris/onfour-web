import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";
import FlexibleGrid from "../flexible_grid/flexible_grid";

import "./profile_styles.scss";

const ProfileStub = (props) => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="profile-stub-container">
      <img src={props.img} className="profile-stub" />
    </div>
  );
};

export default ProfileStub;
