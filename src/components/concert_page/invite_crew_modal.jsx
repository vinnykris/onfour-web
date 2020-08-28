import React, { useState } from "react";
import Rodal from "rodal";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import EditCrewModal from "../user_profile/edit_crew_modal";
import SingleCrewModal from "../user_profile/single_crew_modal";

import { Row, Col } from "../grid";

const InviteCrewModal = ({
  showModal,
  userCrews,
  handleClose,
  username,
  userEmail,
  updateCrews,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState({
    name: "",
    id: "",
    admin: "",
    color: "",
    membersArray: [],
  });

  const handleCloseModals = (update = false) => {
    if (update === true) updateCrews();

    setShowEditModal(false);
    setShowSingleModal(false);
  };

  const handleOpenCrewModals = (crewIndex) => {
    setSelectedCrew(userCrews[crewIndex]);

    if (userCrews[crewIndex].admin === username) setShowEditModal(true);
    else setShowSingleModal(true);
  };

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
          <Row className="crew-modal-stacked-row crew-invite-modal-crews">
            {userCrews.map((crew, index) => (
              <Row className="crew-invite-single-crew" key={crew.id}>
                <div className="crew-invite-selection">
                  <div className="crew-invite-radio"></div>
                  <p>{crew.name}</p>
                </div>

                <div
                  className="crew-invite-options"
                  onClick={() => handleOpenCrewModals(index)}
                >
                  ...
                </div>
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
      <EditCrewModal
        showModal={showEditModal}
        handleClose={handleCloseModals}
        crewName={selectedCrew.name}
        crewColor={selectedCrew.color}
        crewAdmin={selectedCrew.admin}
        crewMembersProp={selectedCrew.membersArray}
        username={username}
        crewId={selectedCrew.id}
      />
      <SingleCrewModal 
        showModal={showSingleModal}
        handleClose={handleCloseModals}
        crewName={selectedCrew.name}
        crewAdmin={selectedCrew.admin}
        crewMembersProp={selectedCrew.membersArray}
        username={username}
        userEmail={userEmail}
        crewId={selectedCrew.id}
      />
    </Rodal>
  );
};

export default InviteCrewModal;
