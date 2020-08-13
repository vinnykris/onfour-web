import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import { Row, Col } from "../grid";

import { getUsernameByEmail } from "../../utils/crew";

const SingleCrewModal = ({
  showModal,
  handleClose,
  crewName,
  crewColor,
  crewAdmin,
  crewMembersProp,
}) => {
  const [crewMembers, setCrewMembers] = useState(crewMembersProp);
  const [emailValue, setEmailValue] = useState("");
  const [memberInputDisabled, setMemberInputDisabled] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

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
          {
            email: newCrewMemberEmail,
            userName: newCrewMemberUserName,
          },
          ...crewMembers,
        ]);

        setEmailValue("");
      }

      setMemberInputDisabled(false);
    }
  };

  const handleCrewMemberRemoval = (deleteIndex) => {
    setCrewMembers(
      crewMembers.filter((member, index) => index !== deleteIndex)
    );
  };

  useEffect(() => {
    setCrewMembers(crewMembersProp);
  }, [crewMembersProp]);

  return (
    <Rodal
      visible={showModal}
      onClose={handleClose}
      width={458}
      height={558}
      measure="px"
      showCloseButton={false}
      customStyles={{ background: `#${crewColor}` }}
      customMaskStyles={{ background: "rgba(0,0,0,0.8)", cursor: "pointer" }}
      className="single-crew-modal"
    >
      <Row>
        <Col size={1} className="single-crew-column">
          <Row className="single-crew-title">
            <p title={crewName}>{crewName}</p>
            <span onClick={() => setShowContextMenu(!showContextMenu)}>
              ...
            </span>
            <div
              className="single-crew-context-menu"
              style={{ display: showContextMenu ? "block" : "none" }}
            >
              <div className="single-crew-context-item">Rename</div>
              <div className="single-crew-context-item single-crew-context-item-delete">
                Delete Crew
              </div>
            </div>
          </Row>
          <Row className="single-crew-input">
            <input
              type="text"
              placeholder="Invite by Name or Email"
              value={emailValue}
              onKeyDown={handleNewCrewMember}
              onChange={(event) => setEmailValue(event.currentTarget.value)}
              disabled={memberInputDisabled}
            />
          </Row>
          <Row className="single-crew-member-wrapper">
            {crewMembers.map((member, index) => (
              <Row key={member.email} className="single-crew-member">
                <div
                  className="single-crew-member-initial"
                  style={{ color: `#${crewColor}` }}
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
                  <p className="single-crew-member-data-email">
                    {member.email}
                  </p>
                </div>
                {member.username === crewAdmin && (
                  <div className="single-crew-member-admin">admin</div>
                )}
                {member.username !== crewAdmin && (
                  <div className="sigle-crew-member-remove-button">
                    <RemoveCircleOutlineIcon
                      onClick={() => handleCrewMemberRemoval(index)}
                    />
                  </div>
                )}
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
