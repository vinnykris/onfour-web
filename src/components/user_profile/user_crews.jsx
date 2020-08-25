import React, { useState } from "react";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Row, Col } from "../grid";

import EditCrewModal from "./edit_crew_modal";
import SingleCrewModal from "./single_crew_modal";

const UserCrews = ({ userCrews, username, userEmail }) => {
  const [showEditCrewModal, setshowEditCrewModal] = useState(false);
  const [showSingleCrewModal, setShowSingleCrewModal] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(userCrews[0]);

  const handleCrewSelection = (crewIndex) => {
    const userSelectedCrew = userCrews[crewIndex];
    setSelectedCrew(userSelectedCrew);

    if (userSelectedCrew.admin === username) setshowEditCrewModal(true);
    else setShowSingleCrewModal(true);
  };

  return (
    <Row className="crews-container">
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

      <div className="fixed-crew-navigation-button">
        <ArrowForwardIosIcon />
      </div>
      <div className="fixed-crew-navigation-button">
        <ArrowBackIosIcon />
      </div>

      <EditCrewModal
        showModal={showEditCrewModal}
        handleClose={() => setshowEditCrewModal(false)}
        crewName={selectedCrew.name}
        crewColor={selectedCrew.color}
        crewAdmin={selectedCrew.admin}
        crewMembersProp={selectedCrew.membersArray}
        username={username}
        crewId={selectedCrew.id}
      />

      <SingleCrewModal
        showModal={showSingleCrewModal}
        handleClose={() => setShowSingleCrewModal(false)}
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
