import React, { useState, useEffect, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Row, Col } from "../grid";
import FlexibleGrid from "../flexible_grid/flexible_grid";
import dashboardIcon from "../../images/icons/chrome_reader_mode_24px_outlined.png";

import CreateCrewModal from "./create_crew_modal";
import UserCrews from "./user_crews";

import { getCrewsByUsername, getCrewObject } from "../../utils/crew";

import "./profile_styles.scss";

const DashboardPage = ({
  width,
  upcoming_concerts,
  memories,
  username,
  userEmail,
  history,
}) => {
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [userCrews, setUserCrews] = useState([]);
  const [availableColors, setAvailableColors] = useState([
    "D1AE53",
    "04ADC0",
    "BF8AF4",
    "49BDFE",
    "444DF2",
    "E26A6A",
  ]);
  const [loadingCrews, setLoadingCrews] = useState(false);
  const [showBackSliderButton, setShowBackSliderButton] = useState(false);
  const [showForwardSliderButton, setShowForwardSliderButton] = useState(false);
  const [sliderCalcFirstRun, setSliderCalcFirstRun] = useState(false);

  const sliderContainerRef = useRef(null);

  /**
   * Closes the Create Crew Modal and updates the user data if needed.
   * @param {boolean} update Determines if the getUserCrews function will be called to update the crew information
   * @returns {void}
   */
  const closeModal = (update = false) => {
    if (update === true) getUserCrews();
    setShowCrewModal(false);
  };

  /**
   * Gets the user crews and orders the data to make it render ready.
   * This method will automatically set the crew data into the local state.
   * @returns {void}
   * @example [{
   *    admin: "admin.user",
   *    color: "FFF",
   *    id: "crew-id",
   *    members: "{'unknown[at]email.com': '', 'registered[at]user.com': 'admin.user'}",
   *    membersArray: [{
   *      color: "AAA",
   *      email: "registered[at]user.com",
   *      initial: "A",
   *      username: "admin.user",
   *    }],
   *    name: "Crew Name",
   * }]
   */
  const getUserCrews = async () => {
    try {
      // Shows a loading screen while we're getting the crews information.
      setLoadingCrews(true);
      const userCrews = await getCrewsByUsername(username);

      if (userCrews) {
        const crewsIdArray = Object.keys(userCrews);
        const crewsDataPromises = [];

        // Moving all the crew ids input a promise which will return the complete crew structure.
        crewsIdArray.forEach((crewId) => {
          crewsDataPromises.push(getCrewObject(crewId));
        });

        // Resolving the crew promises to get an array of crews.
        const crewData = await Promise.all(crewsDataPromises);

        crewData.forEach((crew, crewIndex) => {
          // Check if the crew contains data, this prevents issues when a crew id doesn't exist.
          if (!crew) return;

          const crewMembersArray = [];
          const crewMembersEntries = Object.entries(JSON.parse(crew.members));

          // Creating the structure for the membersArray for each crew member.
          crewMembersEntries.forEach((member) => {
            const processedMember = {
              email: member[0],
              username: member[1] || member[0],
              initial: member[1]
                ? member[1][0].toUpperCase()
                : member[0][0].toUpperCase(),
              color:
                availableColors[
                  Math.floor(Math.random() * Math.floor(availableColors.length))
                ],
            };

            crewMembersArray.push(processedMember);
          });

          // Looks for the location of the crew adming in the membersArray and moves them to the top of the list.
          let adminLocation = 0;
          crewMembersArray.forEach((member, memberIndex) => {
            if (member.username === crew.admin) {
              adminLocation = memberIndex;
            }
          });

          if (adminLocation !== 0) {
            const tempMember = crewMembersArray[0];
            crewMembersArray[0] = crewMembersArray[adminLocation];
            crewMembersArray[adminLocation] = tempMember;
          }

          crewData[crewIndex].color = userCrews[crew.id];
          crewData[crewIndex].membersArray = crewMembersArray;
        });

        // Looks for crews that are empty and removes them from the crewsData array to prevent issues while rendering.
        crewData.forEach((crew, crewIndex) => {
          if (!crew) crewData.splice(crewIndex, 1);
        });

        // Orders the crews by their name in descending order.
        crewData.sort((crewA, crewB) => {
          if (crewA.name < crewB.name) return -1;
          if (crewA.name > crewB.name) return 1;
          return 0;
        });

        // Sets the parsed crew data in the local state and stops the loading animation.
        setUserCrews(crewData);
        setLoadingCrews(false);
      }
    } catch (errorMessage) {
      console.warn("There was an error getting the user crews: ", errorMessage);
      setLoadingCrews(false);
    }
  };

  /**
   * Checks if the crews slider container is overflowing.
   * @returns {boolean} true if there's overflow and false if not.
   */
  const checkIfSliderIsOverflowing = () => {
    if (
      sliderContainerRef.current.clientWidth <
      sliderContainerRef.current.scrollWidth
    )
      return true;
    return false;
  };

  /**
   * Moves the crews slider container forward using an element reference.
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
   * Moves the crews slider container backwards using an element reference.
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
    const crewSlider = event.currentTarget;
    const scrollPosition = crewSlider.scrollLeft;
    const maxScrollWidth = crewSlider.scrollWidth - crewSlider.clientWidth;

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
   * Handles the window resize and helps the crew slider to show or hide the forward button if the container is overflowing.
   * @return {void}
   */
  const handleWindowResize = () => {
    if (sliderContainerRef.current && userCrews.length > 0)
      console.log("checking if overflowing!");
    if (checkIfSliderIsOverflowing()) {
      setShowForwardSliderButton(true);
    } else {
      setShowForwardSliderButton(false);
    }
  };

  useEffect(() => {
    getUserCrews();
    window.addEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (
      !sliderCalcFirstRun &&
      sliderContainerRef.current &&
      userCrews.length > 0
    )
      if (checkIfSliderIsOverflowing()) {
        setShowForwardSliderButton(true);
        setSliderCalcFirstRun(true);
      }
  });

  return (
    <Col size={7} style={{ width: "90%" }}>
      <Row className="header-section">
        <img src={dashboardIcon} className="profile-header-icon"></img>
        <h4 className="profile-preview-content-header username-header">
          Dashboard
        </h4>
        {/* <h4 className="profile-preview-content-header dashboard-header">
                    Dashboard
                    </h4> */}
        {/* <h4 className="profile-preview-content-header perform-header">I want to perform</h4> */}
      </Row>
      <Row className="profile-section">
        <Col className="profile-column" size={1}>
          {upcoming_concerts.length > 0 ? (
            <div>
              <Row>
                <Col size={1}>
                  <h4 className="profile-preview-content-header">
                    MY UPCOMING SHOWS
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  {width <= 600 ? (
                    <FlexibleGrid
                      content_list={upcoming_concerts}
                      num_cols={1}
                    />
                  ) : (
                    <div>
                      {width < 1280 ? (
                        <div>
                          {width <= 768 ? (
                            <FlexibleGrid
                              content_list={upcoming_concerts}
                              num_cols={3}
                            />
                          ) : (
                            <FlexibleGrid
                              content_list={upcoming_concerts}
                              num_cols={4}
                            />
                          )}
                        </div>
                      ) : (
                        <FlexibleGrid
                          content_list={upcoming_concerts}
                          num_cols={4}
                        />
                      )}
                    </div>
                  )}
                </Col>
              </Row>
              {memories.length > 0 ? (
                <div className="memories-container">
                  <Row>
                    <Col size={1}>
                      <h4 className="profile-preview-content-header">
                        MY MEMORIES
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={1}>
                      {width <= 600 ? (
                        <FlexibleGrid content_list={memories} num_cols={1} />
                      ) : (
                        <div>
                          {width < 1280 ? (
                            <div>
                              {width <= 768 ? (
                                <FlexibleGrid
                                  content_list={memories}
                                  num_cols={3}
                                />
                              ) : (
                                <FlexibleGrid
                                  content_list={memories}
                                  num_cols={4}
                                />
                              )}
                            </div>
                          ) : (
                            <FlexibleGrid
                              content_list={memories}
                              num_cols={4}
                            />
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="profile-empty-state">
              <Row>
                <Col size={1}>
                  <h4 className="profile-preview-content-header">
                    MY UPCOMING SHOWS
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col size={1} className="empty-upcoming-concert-container">
                  <h4 className="empty-state-message">
                    Oops... it looks like you aren't going to any upcoming
                    shows.
                  </h4>
                  <h5 className="empty-state-message">
                    Get your ticket to a show below!
                  </h5>
                  <button
                    className="upcoming-prompt-button"
                    onClick={() => history.push("/upcoming")}
                  >
                    View Upcoming Shows
                  </button>
                </Col>
              </Row>
              {memories.length > 0 ? (
                <div>
                  <Row>
                    <Col size={1}>
                      <h4 className="profile-preview-content-header">
                        MY MEMORIES
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={1}>
                      {width <= 600 ? (
                        <FlexibleGrid content_list={memories} num_cols={1} />
                      ) : (
                        <div>
                          {width < 1280 ? (
                            <div>
                              {width <= 768 ? (
                                <FlexibleGrid
                                  content_list={memories}
                                  num_cols={3}
                                />
                              ) : (
                                <FlexibleGrid
                                  content_list={memories}
                                  num_cols={4}
                                />
                              )}
                            </div>
                          ) : (
                            <FlexibleGrid
                              content_list={memories}
                              num_cols={4}
                            />
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              ) : null}
            </div>
          )}

          <div className="user-crews-container profile-empty-state">
            <Row className="user-crews-title">
              <Col size={1}>
                <h4 className="profile-preview-content-header">
                  My Crews{" "}
                  {userCrews.length > 0 && (
                    <span
                      onClick={() => setShowCrewModal(true)}
                      style={{
                        color: "white",
                        cursor: "pointer",
                        fontSize: "22px",
                      }}
                    >
                      +
                    </span>
                  )}
                </h4>
              </Col>
            </Row>
            <Row className="user-crew-wrapper">
              {loadingCrews !== true ? (
                <>
                  <div
                    className={`fixed-crew-navigation-button-left ${
                      !showBackSliderButton && "hide-button"
                    }`}
                    onClick={handleBackwardScroll}
                  >
                    <ArrowBackIosIcon />
                  </div>
                  <Col
                    size={1}
                    className="user-crews-column"
                    ref={sliderContainerRef}
                    onScroll={(e) => handleSliderScroll(e)}
                  >
                    {userCrews.length > 0 ? (
                      <UserCrews
                        userCrews={userCrews}
                        username={username}
                        userEmail={userEmail}
                        updateCrews={getUserCrews}
                      />
                    ) : (
                      <div
                        className="create-crew-wrapper"
                        onClick={() => setShowCrewModal(true)}
                      >
                        <p>Create Crew +</p>
                      </div>
                    )}
                  </Col>
                  <div
                    onClick={handleForwardScroll}
                    className={`fixed-crew-navigation-button ${
                      !showForwardSliderButton && "hide-button"
                    }`}
                  >
                    <ArrowForwardIosIcon />
                  </div>
                </>
              ) : (
                <Col size={1} className="user-crews-column">
                  <div className="user-crews-loader">
                    <PulseLoader
                      sizeUnit="px"
                      size={18}
                      color="#7b6dac"
                      loading={loadingCrews}
                    />
                  </div>
                </Col>
              )}
            </Row>
          </div>

          <CreateCrewModal
            showCrewModal={showCrewModal}
            closeModal={closeModal}
            currentUsername={username}
            currentUserEmail={userEmail}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default DashboardPage;
