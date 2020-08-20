import React from "react";
import Rodal from "rodal";

import { Row, Col } from "../grid";

const SingleCrewModal = ({
  showModal,
  handleClose,
  crewName,
  crewAdmin,
  crewMembersProp,
  username,
}) => {
  return (
    <Rodal
      visible={showModal}
      onClose={handleClose}
      width={511}
      height={559}
      measure="px"
      customMaskStyles={{ background: "rgba(0,0,0,0.8)", cursor: "pointer" }}
      className="single-crew-modal"
    >
      <Row className="user-create-crew">
        <Col size={1} className="single-crew-column">
          <Row className="crew-modal-stacked-row crew-modal-title-information">
            <h1 className="crew-modal-title">{crewName}</h1>
          </Row>
          <Row className="single-crew-member-wrapper crew-modal-user-container crew-modal-single-crew-container">
            {crewMembersProp.map((member) => (
              <div className="crew-modal-add-user-wrapper" key={member.email}>
                <div className="crew-modal-add-user-data">
                  <div
                    className="crew-modal-add-user-initial"
                    style={{
                      background: `#${member.color}`,
                    }}
                  >
                    {member.initial}
                  </div>
                  <div className="crew-modal-add-user-data-wrapper">
                    <div className="crew-modal-user-info">
                      <p className="crew-modal-add-user-name">
                        {member.username}
                      </p>
                      <p className="crew-modal-add-user-email">
                        {member.email}
                      </p>
                    </div>
                    {member.username === crewAdmin && (
                      <div className="single-crew-member-admin">ADMIN</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Row>
          <Row className="crew-modal-save-button-wrapper">
            <button className="crew-modal-button-secondary crew-modal-button-centered">LEAVE CREW</button>
          </Row>
        </Col>
      </Row>
    </Rodal>
  );
};

export default SingleCrewModal;
