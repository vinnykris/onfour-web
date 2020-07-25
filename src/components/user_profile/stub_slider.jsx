import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Slider from "react-slick";

import { Grid, Row, Col } from "../grid";
import { useWindowDimensions } from "../custom_hooks";
import FlexibleGrid from "../flexible_grid/flexible_grid";

import "./profile_styles.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfileStub from "./profile_stub";

const StubSlider = ({ stubs }) => {
  const { height, width } = useWindowDimensions(); // Dimensions of screen
  console.log(stubs);

  //   $(".centered-stubs").slick({
  //     centerMode: true,
  //     centerPadding: "60px",
  //     slidesToShow: 3,
  //     responsive: [
  //       {
  //         breakpoint: 768,
  //         settings: {
  //           arrows: false,
  //           centerMode: true,
  //           centerPadding: "40px",
  //           slidesToShow: 3,
  //         },
  //       },
  //       {
  //         breakpoint: 480,
  //         settings: {
  //           arrows: false,
  //           centerMode: true,
  //           centerPadding: "40px",
  //           slidesToShow: 1,
  //         },
  //       },
  //     ],
  //   });

  var settings = {
    centerMode: true,
    arrows: true,
    speed: 500,
    centerPadding: "40px",
    slidesToScroll: 3,
  };

  return (
    <Slider {...settings}>
      {stubs.map((stub) => (
        <div>{stub}</div>
      ))}
    </Slider>
    // <div className="centered-stubs">{stubs.map((stub) => stub)}</div>
  );
};

export default StubSlider;
