import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import CheckIcon from "@material-ui/icons/Check";

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
  const [crewToEdit, setCrewToEdit] = useState({
    name: "",
    id: "",
    admin: "",
    color: "",
    membersArray: [],
  });
  const [crewNameFilter, setCrewNameFilter] = useState("");
  const [selectedCrewId, setSelectedCrewId] = useState("");
  const [disableInviteButton, setDisableInviteButton] = useState(true);

  /**
   * Closes both the edit and the view crew modals and updates the users crews if requested.
   * @param {boolean} update Determines if the user crews should be updated.
   * @returns {void}
   */
  const handleCloseModals = (update = false) => {
    if (update === true) updateCrews();

    setShowEditModal(false);
    setShowSingleModal(false);
  };

  /**
   * Shows either an edit or view crew modal based on the index of the user crews.
   * @param {number} crewIndex The index number of the crew to open in the modal.
   * @returns {void}
   */
  const handleOpenCrewModals = (currentCrewId) => {
    const currentCrewToEdit = userCrews.filter(
      (crew) => crew.id === currentCrewId
    )[0];

    setCrewToEdit(currentCrewToEdit);

    // If current user if the admin open the edit modal if not then open the view modal.
    if (currentCrewToEdit.admin === username) setShowEditModal(true);
    else setShowSingleModal(true);
  };

  const handleInviteSelectedCrew = () => {
    // @TODO: It should invite the crew to the concert.
    console.log("Inviting crew ", selectedCrewId);
  };

  useEffect(() => {
    if (selectedCrewId.length > 0) setDisableInviteButton(false);
  }, [selectedCrewId]);

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
              value={crewNameFilter}
              onChange={(event) => setCrewNameFilter(event.currentTarget.value)}
            />
            <SearchOutlinedIcon />
          </Row>
          <Row className="crew-modal-stacked-row crew-invite-modal-crews">
            {userCrews
              .filter((crew) =>
                crew.name.toLowerCase().includes(crewNameFilter.toLowerCase())
              )
              .map((crew) => (
                <Row className="crew-invite-single-crew" key={crew.id}>
                  <div className="crew-invite-selection">
                    <div
                      className={`${
                        selectedCrewId === crew.id && "crew-invite-radio-active"
                      } crew-invite-radio`}
                      onClick={() => setSelectedCrewId(crew.id)}
                    >
                      {selectedCrewId === crew.id && <CheckIcon />}
                    </div>
                    <p>{crew.name}</p>
                  </div>

                  <div
                    className="crew-invite-options"
                    onClick={() => handleOpenCrewModals(crew.id)}
                  >
                    ...
                  </div>
                </Row>
              ))}
          </Row>
          <Row className="crew-modal-save-button-wrapper">
            <div>
              <button
                className="crew-modal-button-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="crew-modal-button-primary"
                onClick={handleInviteSelectedCrew}
                disabled={disableInviteButton}
              >
                Invite
              </button>
            </div>
          </Row>
        </Col>
      </Row>
      <EditCrewModal
        showModal={showEditModal}
        handleClose={handleCloseModals}
        crewName={crewToEdit.name}
        crewColor={crewToEdit.color}
        crewAdmin={crewToEdit.admin}
        crewMembersProp={crewToEdit.membersArray}
        username={username}
        crewId={crewToEdit.id}
      />
      <SingleCrewModal
        showModal={showSingleModal}
        handleClose={handleCloseModals}
        crewName={crewToEdit.name}
        crewAdmin={crewToEdit.admin}
        crewMembersProp={crewToEdit.membersArray}
        username={username}
        userEmail={userEmail}
        crewId={crewToEdit.id}
      />
    </Rodal>
  );
};

export default InviteCrewModal;
