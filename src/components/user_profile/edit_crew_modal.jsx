import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";

import { Row, Col } from "../grid";

import { getUsernameByEmail } from "../../utils/crew";

const EditCrewModal = ({
  showModal,
  handleClose,
  crewName,
  crewColor,
  crewAdmin,
  crewMembersProp,
  username,
}) => {
  const [crewMembers, setCrewMembers] = useState(crewMembersProp);
  const [emailValue, setEmailValue] = useState("");
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [newCrewName, setNewCrewName] = useState(crewName);
  const [memberInputDisabled, setMemberInputDisabled] = useState(false);
  const [availableColors, setAvailableColors] = useState([
    "D1AE53",
    "04ADC0",
    "BF8AF4",
    "49BDFE",
  ]);

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

      const duplicateCrewMemberEmail = crewMembers.filter(
        (member) => member.email === newCrewMemberEmail
      );

      if (duplicateCrewMemberEmail.length === 0) {
        setCrewMembers([
          ...crewMembers,
          {
            email: newCrewMemberEmail,
            username: newCrewMemberUserName,
            initial: newCrewMemberUserName[0].toUpperCase(),
            color:
              availableColors[
                Math.floor(Math.random() * Math.floor(availableColors.length))
              ],
          },
        ]);

        setEmailValue("");
        setSaveButtonDisabled(false);
      }

      setMemberInputDisabled(false);
    }
  };

  const handleCrewMemberRemoval = (deleteIndex) => {
    setCrewMembers(
      crewMembers.filter((member, index) => index !== deleteIndex)
    );
    setSaveButtonDisabled(false);
  };

  const handleChangeCrewName = (anotherCrewName) => {
    setNewCrewName(anotherCrewName);
    setSaveButtonDisabled(false);
  };

  const handleMainModalClose = () => {
    handleClose();
    setSaveButtonDisabled(true);
    setNewCrewName(crewName);
    setCrewMembers(crewMembersProp);
  };

  useEffect(() => {
    setCrewMembers(crewMembersProp);
    setNewCrewName(crewName);
  }, [crewMembersProp, crewName]);

  return (
    <Rodal
      visible={showModal}
      onClose={handleMainModalClose}
      width={511}
      height={700}
      measure="px"
      customMaskStyles={{ background: "rgba(0,0,0,0.8)", cursor: "pointer" }}
      className="single-crew-modal"
    >
      <Row className="user-create-crew">
        <Col size={1} className="single-crew-column">
          <Row className="crew-modal-stacked-row crew-modal-title-information">
            <h1 className="crew-modal-title">Edit Crew</h1>
          </Row>
          <Row className="crew-modal-stacked-row">
            <p className="crew-modal-section-title">Crew Name*</p>
            <input
              type="text"
              placeholder="What do you want to call this crew?"
              className="crew-modal-input"
              value={newCrewName}
              onChange={(event) =>
                handleChangeCrewName(event.currentTarget.value)
              }
            />
          </Row>
          <Row className="crew-modal-stacked-row">
            <p className="crew-modal-section-title">Members</p>
            <input
              type="text"
              placeholder="Type an email address to add"
              className="crew-modal-input"
              value={emailValue}
              onKeyDown={handleNewCrewMember}
              onChange={(event) => setEmailValue(event.currentTarget.value)}
              disabled={memberInputDisabled}
            />
          </Row>
          <Row className="single-crew-member-wrapper crew-modal-user-container">
            {crewMembers.map((member, index) => (
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
                    {username === crewAdmin && member.username !== crewAdmin && (
                      <div className="crew-modal-add-user-remove-button">
                        <RemoveCircleOutlinedIcon
                          onClick={() => handleCrewMemberRemoval(index)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Row>
          <Row className="crew-modal-save-button-wrapper">
            <div>
              <button className="crew-modal-button-secondary">
                Delete Crew
              </button>
              <button
                className="crew-modal-button-primary"
                disabled={saveButtonDisabled}
              >
                Save Changes
              </button>
            </div>
          </Row>
        </Col>
      </Row>
    </Rodal>
  );
};

export default EditCrewModal;
