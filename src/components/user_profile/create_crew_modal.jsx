import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";

import { Row, Col } from "../grid";

import { getUsernameByEmail, createCrew } from "../../utils/crew";

const CreateCrewModal = ({
  showCrewModal,
  closeModal,
  currentUsername,
  currentUserEmail,
}) => {
  const [availableColors, setAvailableColors] = useState([
    "D1AE53",
    "04ADC0",
    "BF8AF4",
    "49BDFE",
    "444DF2",
    "E26A6A",
  ]);
  const [selectedColor, setSelectedColor] = useState(
    availableColors[
      Math.floor(Math.random() * Math.floor(availableColors.length))
    ]
  );
  const [crewMembers, setCrewMembers] = useState([]);
  const [crewName, setCrewName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [memberInputDisabled, setMemberInputDisabled] = useState(false);

  const checkValidEmailFormat = (email) => {
    const emailValidationRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailValidationRegex.test(email);
  };

  const handleNewCrewMember = async (event) => {
    if (
      event.key === "Enter" &&
      checkValidEmailFormat(event.currentTarget.value)
    ) {
      setMemberInputDisabled(true);
      const newCrewMemberEmail = event.currentTarget.value;
      let newCrewMemberUserName = await getUsernameByEmail(newCrewMemberEmail);
      newCrewMemberUserName = newCrewMemberUserName || newCrewMemberEmail;
      const newCrewMemberInitial = newCrewMemberUserName[0].toUpperCase();

      const duplicateCrewMemberEmail = crewMembers.filter(
        (member) => member.email === newCrewMemberEmail
      );

      if (
        duplicateCrewMemberEmail.length === 0 &&
        newCrewMemberUserName !== currentUsername &&
        crewMembers.length < 5
      ) {
        setCrewMembers([
          ...crewMembers,
          {
            email: newCrewMemberEmail,
            initial: newCrewMemberInitial,
            userName: newCrewMemberUserName,
            color:
              availableColors[
                Math.floor(Math.random() * Math.floor(availableColors.length))
              ],
          },
        ]);

        setEmailValue("");
      }

      setMemberInputDisabled(false);
    }
  };

  const handleRemoveCrewMember = (indexOfCrewMember) => {
    setCrewMembers(
      crewMembers.filter((member, index) => index !== indexOfCrewMember)
    );
  };

  const handleCrewNameChange = (event) => {
    setCrewName(event.currentTarget.value);
  };

  const handleCloseMainModal = () => {
    handleDiscardData();
    closeModal();
  };

  const handleDiscardData = () => {
    setCrewMembers([]);
    setCrewName("");
    setEmailValue("");
  };

  const handleCrewCreation = async () => {
    const emailsToSave = [currentUserEmail];
    crewMembers.map((member) => emailsToSave.push(member.email));

    await createCrew(emailsToSave, crewName, currentUsername, selectedColor);

    handleDiscardData();
    closeModal(true);
  };

  useEffect(() => {
    if (crewName.length > 2 && crewMembers.length > 0) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }

    if (crewMembers.length >= 5) {
      setMemberInputDisabled(true);
    } else {
      setMemberInputDisabled(false);
    }
  }, [crewMembers, crewName]);

  useEffect(() => {
    if (crewMembers.length >= 5) {
      setMemberInputDisabled(true);
    }
  }, [memberInputDisabled]);

  return (
    <Rodal
      visible={showCrewModal}
      onClose={handleCloseMainModal}
      width={511}
      height={700}
      measure="px"
      customMaskStyles={{ background: "rgba(0,0,0,0.8)", cursor: "pointer" }}
      className="user-crews-modal"
    >
      <Row className="user-create-crew">
        <Col size={1}>
          <Row className="crew-modal-stacked-row crew-modal-title-information">
            <h1 className="crew-modal-title">Create New Crew</h1>
            <p className="crew-modal-description">
              After creating your crew, you can invite them to concerts in your
              upcoming concert page.
            </p>
          </Row>
          <Row className="crew-modal-stacked-row">
            <p className="crew-modal-section-title">Crew Name*</p>
            <input
              type="text"
              placeholder="What do you want to call this crew?"
              className="crew-modal-input"
              onChange={handleCrewNameChange}
              value={crewName}
            />
          </Row>
          <Row className="crew-modal-stacked-row">
            <p className="crew-modal-section-title">Members</p>
            <input
              type="text"
              placeholder="Type an email address to add"
              className="crew-modal-input"
              onKeyDown={async (event) => await handleNewCrewMember(event)}
              onChange={(event) => setEmailValue(event.currentTarget.value)}
              value={emailValue}
              disabled={memberInputDisabled}
            />
          </Row>
          <Row className="crew-modal-stacked-row crew-modal-user-container">
            {crewMembers.length > 0 ? (
              crewMembers.map((member, index) => (
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
                          {member.userName}
                        </p>
                        <p className="crew-modal-add-user-email">
                          {member.email}
                        </p>
                      </div>

                      <div className="crew-modal-add-user-remove-button">
                        <RemoveCircleOutlinedIcon
                          onClick={() => handleRemoveCrewMember(index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="crew-modal-flex-row">
                <div className="crew-modal-members-icon">
                  <AccountCircleOutlinedIcon />
                </div>
                <p className="crew-modal-members-text">No crew members yet</p>
              </div>
            )}
          </Row>
          <Row className="crew-modal-save-button-wrapper">
            <div>
              <button
                className="crew-modal-button-secondary"
                onClick={handleCloseMainModal}
              >
                Cancel
              </button>
              <button
                className="crew-modal-button-primary"
                disabled={saveButtonDisabled}
                onClick={handleCrewCreation}
              >
                Create
              </button>
            </div>
          </Row>
        </Col>
      </Row>
    </Rodal>
  );
};

export default CreateCrewModal;
