import React, { useState } from "react";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Row, Col } from "../grid";

import EditCrewModal from "./edit_crew_modal";
import SingleCrewModal from "./single_crew_modal";

const UserCrews = ({
  userCrews,
  username,
  userEmail,
  updateCrews,
  slideForward,
  slideBack,
  showBackButton,
  showForwardButton,
}) => {
  const [showEditCrewModal, setshowEditCrewModal] = useState(false);
  const [showSingleCrewModal, setShowSingleCrewModal] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(userCrews[0]);

  const handleCrewSelection = (crewIndex) => {
    const userSelectedCrew = userCrews[crewIndex];
    setSelectedCrew(userSelectedCrew);

    if (userSelectedCrew.admin === username) setshowEditCrewModal(true);
    else setShowSingleCrewModal(true);
  };

  const handleCloseCrewModal = (update) => {
    if (update === true) updateCrews();
    setShowSingleCrewModal(false);
    setshowEditCrewModal(false);
  };

  return (
    <Row className="crews-container">
      <div
        className={`fixed-crew-navigation-button-left ${
          !showBackButton && "hide-button"
        }`}
        onClick={slideBack}
      >
        <ArrowBackIosIcon />
      </div>

      <Col size={1}>
        <Row>
          {userCrews.map((crew, index) => (
            <div
              key={`${crew.name}${index}`}
              className="crew-stub-wrapper"
              onClick={() => handleCrewSelection(index)}
            >
              <Row className="crew-stub-title">
                <p title={crew.name}>{crew.name}</p>
              </Row>
              <Row className="crew-stub-crew-members">
                {crew.membersArray.slice(0, 6).map((member) => (
                  <Row key={member.email} className="crew-stub-member">
                    <div
                      className="crew-stub-member-initial"
                      style={{
                        backgroundColor: `#${member.color}`,
                      }}
                    >
                      {member.username.length > 0
                        ? member.username[0].toUpperCase()
                        : member.email[0].toUpperCase()}
                    </div>
                    <p
                      title={member.username}
                      className="crew-stub-member-data-username"
                    >
                      {member.username}
                    </p>
                  </Row>
                ))}
              </Row>
            </div>
          ))}
        </Row>
      </Col>

      <div
        onClick={slideForward}
        className={`fixed-crew-navigation-button ${
          !showForwardButton && "hide-button"
        }`}
      >
        <ArrowForwardIosIcon />
      </div>

      <EditCrewModal
        showModal={showEditCrewModal}
        handleClose={handleCloseCrewModal}
        crewName={selectedCrew.name}
        crewColor={selectedCrew.color}
        crewAdmin={selectedCrew.admin}
        crewMembersProp={selectedCrew.membersArray}
        username={username}
        crewId={selectedCrew.id}
      />

      <SingleCrewModal
        showModal={showSingleCrewModal}
        handleClose={handleCloseCrewModal}
        crewName={selectedCrew.name}
        crewAdmin={selectedCrew.admin}
        crewMembersProp={selectedCrew.membersArray}
        username={username}
        userEmail={userEmail}
        crewId={selectedCrew.id}
      />
    </Row>
  );
};

export default UserCrews;
