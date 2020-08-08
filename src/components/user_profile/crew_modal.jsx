import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CheckIcon from "@material-ui/icons/Check";

import { Row, Col } from "../grid";

import { getUsernameByEmail } from "../../utils/crew";

const CrewModal = ({ showCrewModal, closeModal, currentUsername }) => {
  const [availableColors, setAvailableColors] = useState([
    "#E26A6A",
    "#E465A2",
    "#3EB095",
    "#B89F45",
    "#6A6EE2",
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
        newCrewMemberUserName !== currentUsername
      ) {
        setCrewMembers([
          {
            email: newCrewMemberEmail,
            initial: newCrewMemberInitial,
            userName: newCrewMemberUserName,
          },
          ...crewMembers,
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

  const handleCreNameChange = (event) => {
    setCrewName(event.currentTarget.value);
  };

  useEffect(() => {
    if (crewName.length > 2 && crewMembers.length > 0) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [crewMembers, crewName]);

  return (
    <Rodal
      visible={showCrewModal}
      onClose={closeModal}
      width={458}
      height={527}
      measure="px"
      customStyles={{ background: selectedColor }}
      customMaskStyles={{ background: "rgba(0,0,0,0.8)", cursor: "pointer" }}
      className="user-crews-modal"
    >
      <Row className="user-create-crew">
        <Col size={1}>
          <Row className="crew-modal-stacked-row">
            <p className="crew-modal-section-title">Crew Name*</p>
            <input
              type="text"
              placeholder="What do you want to call this crew?"
              className="crew-modal-input"
              onChange={handleCreNameChange}
            />
          </Row>
          <Row className="crew-modal-stacked-row">
            <p className="crew-modal-section-title">Crew Members</p>
            <input
              type="text"
              placeholder="Invite by Name or Email"
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
                    <div className="crew-modal-add-user-initial" style={{ color: selectedColor }}>
                      {member.initial}
                    </div>
                    <div className="crew-modal-add-user-data-wrapper">
                      <p className="crew-modal-add-user-name">
                        {member.userName}
                      </p>
                      <p className="crew-modal-add-user-email">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <div className="crew-modal-add-user-remove-button">
                    <RemoveCircleOutlineIcon
                      onClick={() => handleRemoveCrewMember(index)}
                    />
                  </div>
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
                  key={color}
                  onClick={() => setSelectedColor(color)}
                >
                  {color === selectedColor && <CheckIcon />}
                </div>
              ))}
            </div>
          </Row>
          <Row className="crew-modal-save-button-wrapper">
            <button disabled={saveButtonDisabled}>SAVE</button>
          </Row>
        </Col>
      </Row>
    </Rodal>
  );
};

export default CrewModal;
