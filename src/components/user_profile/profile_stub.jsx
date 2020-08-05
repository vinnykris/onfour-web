import React, { useState, useEffect } from "react";

import { useWindowDimensions } from "../custom_hooks";

import "./profile_styles.scss";

const ProfileStub = (props) => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // useEffect(() => {
  //   console.log(props);
  // }, []);

  return (
    <div className="profile-stub-container">
      <img src={props.img} className="profile-stub" />
    </div>
  );
};

export default ProfileStub;
