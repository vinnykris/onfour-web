import React, { useState } from "react";

import { Row, Col } from "../grid";

import SingleCrewModal from "./single_crew_modal";

const UserCrews = ({ userCrews, username }) => {
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(userCrews[0]);

  const handleCrewSelection = (crewIndex) => {
    const userSelectedCrew = userCrews[crewIndex];
    setSelectedCrew(userSelectedCrew);

    setShowCrewModal(true);
  };

  return (
    <Row>
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
                {crew.membersArray.slice(0,6).map((member) => (
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

      <SingleCrewModal
        showModal={showCrewModal}
        handleClose={() => setShowCrewModal(false)}
        crewName={selectedCrew.name}
        crewColor={selectedCrew.color}
        crewAdmin={selectedCrew.admin}
        crewMembersProp={selectedCrew.membersArray}
        username={username}
      />
    </Row>
  );
};

export default UserCrews;
