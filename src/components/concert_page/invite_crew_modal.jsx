import React from "react";
import Rodal from "rodal";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import { Row, Col } from "../grid";

const crews = [
  "Jazz Head",
  "Ravers",
  "Taylor Swift's squad",
  "The Avengers",
  "The meme team",
];

const InviteCrewModal = ({ showModal, handleClose }) => {
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
            <h1 className="crew-modal-title">Invite Crew</h1>
            <p className="crew-modal-description">
              By inviting a crew to a concert, you can live video chat with them
              seamlessly.
            </p>
          </Row>
          <Row className="crew-modal-stacked-row crew-modal-relative">
            <input
              type="text"
              placeholder="Search crew name"
              className="crew-input-rounded"
            />
            <SearchOutlinedIcon />
          </Row>
          <Row className="crew-modal-stacked-row">
            {crews.map((crew) => (
              <Row className="crew-invite-single-crew">
                <div className="crew-invite-selection">
                  <div className="crew-invite-radio"></div>
                  <p>{crew}</p>
                </div>

                <div className="crew-invite-options">...</div>
              </Row>
            ))}
          </Row>
          <Row className="crew-modal-save-button-wrapper">
            <div>
              <button className="crew-modal-button-secondary">Cancel</button>
              <button className="crew-modal-button-primary">Invite</button>
            </div>
          </Row>
        </Col>
      </Row>
    </Rodal>
  );
};

export default InviteCrewModal;
