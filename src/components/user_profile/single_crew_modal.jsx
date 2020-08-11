import React from "react";
import Rodal from "rodal";

import { Row, Col } from "../grid";

const SingleCrewModal = ({
  showModal,
  handleClose,
  crewName,
  crewColor,
  crewAdmin,
  crewMembers,
}) => {
  return (
    <Rodal
      visible={showModal}
      onClose={handleClose}
      width={458}
      height={558}
      measure="px"
      showCloseButton={false}
      customStyles={{ background: crewColor }}
      customMaskStyles={{ background: "rgba(0,0,0,0.8)", cursor: "pointer" }}
      className="single-crew-modal"
    >
      <Row>
        <Col size={1} className="single-crew-column">
          <Row className="single-crew-title">
            <p title={crewName}>{crewName}</p>
          </Row>
          <Row className="single-crew-input">
            <input type="text" placeholder="Invite by Name or Email" />
          </Row>
          <Row className="single-crew-member-wrapper">
            {crewMembers.map((member) => (
              <Row key={member.email} className="single-crew-member">
                <div
                  className="single-crew-member-initial"
                  style={{ color: crewColor }}
                >
                  {member.username.length > 0
                    ? member.username[0].toUpperCase()
                    : member.email[0].toUpperCase()}
                </div>
                <div className="single-crew-member-data-wrapper">
                  <p className="single-crew-member-data-username">
                    {member.username.length > 0
                      ? member.username
                      : member.email}
                  </p>
                  <p className="single-crew-member-data-email">{member.email}</p>
                </div>
              </Row>
            ))}
          </Row>
          <Row className="single-crew-button">
              <button onClick={handleClose}>CLOSE</button>
          </Row>
        </Col>
      </Row>
    </Rodal>
  );
};

export default SingleCrewModal;
