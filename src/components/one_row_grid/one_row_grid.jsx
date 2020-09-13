// React imports
import React, { useState, useEffect, useRef } from "react";

// Component imports
import { Grid, Row, Col } from "../grid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// Styles imports
import "./one_row_grid_styles.scss";

// This grid dynamically displayed content based on numbers of columns specified
const OneRowGrid = ({ content_list }) => {
  
  const [showBackSliderButton, setShowBackSliderButton] = useState(false);
  const [showForwardSliderButton, setShowForwardSliderButton] = useState(false);
  const [sliderCalcFirstRun, setSliderCalcFirstRun] = useState(false);
  const sliderContainerRef = useRef(null);

  /**
   * Checks if the elements slider container is overflowing.
   * @returns {boolean} true if there's overflow and false if not.
   */
  const checkIfSliderIsOverflowing = () => {
    // console.log(sliderContainerRef.current.clientWidth);
    // console.log(sliderContainerRef.current.scrollWidth);
    if (
      sliderContainerRef.current.clientWidth <
      sliderContainerRef.current.scrollWidth
    )
      return true;
    return false;
  };

  /**
   * Moves the elements slider container forward using an element reference.
   * @returns {void}
   */
  const handleForwardScroll = () => {
    sliderContainerRef.current.scrollTo({
      top: 0,
      left: sliderContainerRef.current.scrollLeft + 400,
      behavior: "smooth",
    });
  };

  /**
   * Moves the elements slider container backwards using an element reference.
   * @returns {void}
   */
  const handleBackwardScroll = () => {
    sliderContainerRef.current.scrollTo({
      top: 0,
      left: sliderContainerRef.current.scrollLeft - 400,
      behavior: "smooth",
    });
  };

  /**
   * Determines when to show or hide the back and forward sliders buttons based on the available scrolling space.
   * @param {object} event The event sent back when a scroll event happens in a specified element.
   * @returns {void}
   */
  const handleSliderScroll = (event) => {
    const elementSlider = event.currentTarget;
    const scrollPosition = elementSlider.scrollLeft;
    const maxScrollWidth = elementSlider.scrollWidth - elementSlider.clientWidth;

    if (scrollPosition === 0) {
      setShowBackSliderButton(false);
    }
    if (scrollPosition === maxScrollWidth) {
      setShowForwardSliderButton(false);
    }
    if (scrollPosition > 0) {
      setShowBackSliderButton(true);
    }
    if (scrollPosition < maxScrollWidth) {
      setShowForwardSliderButton(true);
    }
  };

  /**
   * Handles the window resize and helps the element slider to show or hide the forward button if the container is overflowing.
   * @return {void}
   */
  const handleWindowResize = () => {
    if (sliderContainerRef.current && content_list.length > 0)
      // console.log("checking if overflowing!");
      if (checkIfSliderIsOverflowing()) {
        setShowForwardSliderButton(true);
      } else {
        setShowForwardSliderButton(false);
      }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    console.log(sliderContainerRef.current);
    console.log(!sliderCalcFirstRun);
    console.log(content_list.length);
    if (
      !sliderCalcFirstRun &&
      sliderContainerRef.current &&
      content_list.length > 0
    )
      if (checkIfSliderIsOverflowing()) {
        setShowForwardSliderButton(true);
        setSliderCalcFirstRun(true);
      }
  });

  return (
    <Grid className="one-row-grid">
      <div
        className={`fixed-element-navigation-button-left ${
          !showBackSliderButton && "hide-button"
          }`}
        onClick={handleBackwardScroll}
      >
        <ArrowBackIosIcon />
      </div>
      <Col
        size={1}
        className="user-elements-column"
        ref={sliderContainerRef}
        onScroll={(e) => handleSliderScroll(e)}
      >
        <Row className="elements-container">
          <Col size={1}>
            <Row>
              {content_list.map((element, index) => (
                <div
                  key={`${index}`}
                  className="element-stub-wrapper"
                >
                  <Col size={1} key={index} className="black-element">
                    {element}
                  </Col>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
      <div
        onClick={handleForwardScroll}
        className={`fixed-element-navigation-button ${
          !showForwardSliderButton && "hide-button"
          }`}
      >
        <ArrowForwardIosIcon />
      </div>
    </Grid>
  );
};

export default OneRowGrid;
