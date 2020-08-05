import React, { useState } from "react";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";

import { Row, Col } from "../grid";

const CrewModal = () => {
  const [availableColors, setAvailableColors] = useState([
    "#E26A6A",
    "#E465A2",
    "#3EB095",
    "#B89F45",
    "#6A6EE2",
  ]);

  const [crewMembers, setCrewMembers] = useState([]);

  return (
    <Row className="user-create-crew">
      <Col size={1}>
        <Row className="crew-modal-stacked-row">
          <p className="crew-modal-section-title">Crew Name*</p>
          <input
            type="text"
            placeholder="What do you want to call this crew?"
            className="crew-modal-input"
          />
        </Row>
        <Row className="crew-modal-stacked-row">
          <p className="crew-modal-section-title">Crew Members</p>
          <input
            type="text"
            placeholder="Invite by Name or Email"
            className="crew-modal-input"
          />
        </Row>
        <Row className="crew-modal-stacked-row">
          {crewMembers.length > 0 ? (
            crewMembers.map((member) => (
              <div className="crew-modal-flex-row">
                <div className="crew-modal-members-icon">{member.initial}</div>
                <p className="crew-modal-members-text">{member.email}</p>
              </div>
            ))
          ) : (
            <div className="crew-modal-flex-row">
              <div className="crew-modal-members-icon">
                <PersonOutlineRoundedIcon />
              </div>
              <p className="crew-modal-members-text">No crew members yet</p>
            </div>
          )}
        </Row>
        <Row className="crew-modal-stacked-row">
          <p className="crew-modal-section-title">Card Color</p>
          <div className="crew-modal-color-wrapper">
            {availableColors.map((color) => (
              <div
                style={{ backgroundColor: color }}
                className="crew-modal-color-option"
              ></div>
            ))}
          </div>
        </Row>
        <Row className="crew-modal-save-button-wrapper">
          <button>SAVE</button>
        </Row>
      </Col>
    </Row>
  );
};

export default CrewModal;
