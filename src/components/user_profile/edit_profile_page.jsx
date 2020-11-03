// React
import React, { useState } from "react";

// Components
import { useWindowDimensions } from "../custom_hooks";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

// graphql
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";

//Styles
import "./edit_profile_page_styles.scss";
//Images
import Editicon from "../../images/icons/edit_icon.png";
import Edit from "../../images/icons/Edit.png";
// Utils
import InputTwo from "../inputs/input_two";

Amplify.configure(awsmobile); // Configuring AppSync API

const EditProfile = ({
  username,
  userEmail,
  preferred_username,
  hide_original_username,
  setPreferredUsername,
  setHideOriginalUsername,
  width,
}) => {
  const [error, setError] = useState("");
  const [Submit, setSubmit] = useState(false);
  const [Emailbutton, setEmailbutton] = useState(false);
  const [fixedUsername, setFixedUsername] = useState(
    preferred_username || (hide_original_username ? "" : username)
  );
  var Firstchar = username.toUpperCase().charAt(0);

  const isMobile = width < 600;

  const usernameSubmit = async (event) => {
    event.preventDefault();

    const user_by_username = await API.graphql(
      graphqlOperation(queries.get_user_data, {
        input: preferred_username,
      })
    );

    const user_by_preferred_username = await API.graphql(
      graphqlOperation(queries.get_user_by_preferred_username, {
        input: preferred_username,
      })
    );

    if (
      user_by_username.data.getCreateOnfourRegistration ||
      user_by_preferred_username.data.listUsersByPreferredUsername.items
        .length > 0
    ) {
      setError("This username is already taken.");
    } else {
      saveChanges();
      setError("");
      let user = await Auth.currentAuthenticatedUser();
      if (
        user?.signInUserSession?.idToken?.payload?.identities?.[0]
          ?.providerType === "Google" ||
        user?.signInUserSession?.idToken?.payload?.identities?.[0]
          ?.providerType === "Facebook"
      ) {
        const payload = {
          username,
          preferred_username,
        };
        await API.graphql(
          graphqlOperation(mutations.update_user, {
            input: payload,
          })
        );
        window.location.reload();
      } else {
        await Auth.updateUserAttributes(user, {
          preferred_username: preferred_username,
        });
        const payload = {
          username,
          preferred_username,
        };
        await API.graphql(
          graphqlOperation(mutations.update_user, {
            input: payload,
          })
        );
        window.location.reload();
      }
    }
  };
  const emailCLick = () => {
    setEmailbutton(true);
  };
  const saveChanges = () => {
    if (Submit == true) {
      setSubmit(false);
      setEmailbutton(false);
    } else {
      setSubmit(true);
    }
  };
  return (
    <div className="edit-profile-page-content">
      <div className="header-5 Profile-edit-profile">Profile</div>
      {!isMobile && (
        <div classname="user-initials-edit-profile">
          <div className="edit-profile-page-contianer">
            <p
              className="header-4 username-edit-profile"
              data-letters={Firstchar}
            ></p>
            <div className="header-4 username">{fixedUsername}</div>
          </div>
        </div>
      )}
      <form
        className="edit-profile-section"
        action="/"
        id="update-profile-info"
        onSubmit={usernameSubmit}
      >
        <div className="edit-profile-container">
          <div className="edit-profile-sub-container">
            <div className="edit-profile-overview-container header-5">
              Overview
              {Submit ? (
                <button
                  type="submit"
                  value="Submit"
                  form="update-profile-info"
                  className="Save-changes-edit-profile"
                >
                  Save changes
                </button>
              ) : (
                <p
                  className="header-5 edit-profile-overview"
                  style={{ float: "left", width: "415" }}
                >
                  <img
                    src={Editicon}
                    className="edit-pointer-edit-profile"
                    onClick={saveChanges}
                  ></img>
                  <img
                    className="edit-pointertext-edit-profile"
                    src={Edit}
                    onClick={saveChanges}
                  ></img>
                </p>
              )}
            </div>
            <br />
            <br />
            <div className="edit-profile-input-container">
              <div className="header-8 username-box">Username</div>
              <div className="username-box-container">
                <InputTwo
                  id="third_slot"
                  type="text"
                  value={
                    preferred_username ||
                    (hide_original_username ? "" : username)
                  }
                  onChange={(event) => {
                    setPreferredUsername(event.target.value);
                    setHideOriginalUsername(true);
                  }}
                  is_required={true}
                  is_disabled={Submit ? false : true}
                  text_color={Submit ? "white" : "rgba(255, 255, 255, 0.28)"}
                ></InputTwo>
                <div
                  className={
                    isMobile
                      ? "email-username-warning-mobile"
                      : "username-warning"
                  }
                >
                  {error}
                </div>
              </div>
            </div>

            <div className="edit-profile-input-container">
              <div
                className="header-8 input-email-edit-profile"
                style={{ float: "left", marginBottom: "6px" }}
              >
                Email
              </div>
              <div className="email-box-edit-profile">
                <div className="email-container-box">
                  <InputTwo
                    id="second_slot"
                    type="text"
                    placeholder={userEmail}
                    is_disabled={true}
                  ></InputTwo>
                </div>
              </div>
              {Submit ? (
                <div
                  className={
                    isMobile ? "email-username-warning-mobile" : "email-warning"
                  }
                >
                  You cannot change your email address.
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="reset-passwor">
              <p className="forgot-footer">
                <a href="/forgot" className="body-2 signin-link-edit">
                  Reset Password?
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
