// Main Imports
import history from "../../history";

// React
import React, { useState, useEffect } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import ReactTooltip from "react-tooltip";


// Components
import { Grid, Row, Col } from "../grid";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useWindowDimensions } from "../custom_hooks";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

//Styles
import "./edit_profile_page_styles.scss";
//Images
import Editicon from "../../images/icons/edit_icon.png"; 
import Edit from "../../images/icons/Edit.png";
// Utils
  import InputOne from "../inputs/input_one";
import { EditLocation } from "@material-ui/icons";
import { left } from "@popperjs/core";

  Amplify.configure(awsmobile); // Configuring AppSync API

  

const EditProfile = ({username,userEmail})=>{
    const [email, setemail] = useState(userEmail);
    const [Username, setUsername] = useState(username);
    
    const { height, width } = useWindowDimensions(); // Dimensions of screen
    const [Error, setError] = useState("");
    const [Submit, setSubmit] = useState(false);
    const [Emailbutton, setEmailbutton] = useState(false)
    var Firstchar=username.toUpperCase().charAt(0);
    console.log(Firstchar);
    // Auth.currentAuthenticatedUser({})
    // .then((user) => {
    //   setUserEmail(user.attributes.email);
    //   setAuth(true);
    //   setUsername(user.username);
    // //   setProfileURL("");
    // })
    // .catch((err) => setAuth(false));
    // Function that takes the user's entered information and passes it into
    // the AppSync API to be stored in our registered users database table
    
    //on submit:
    // COPYAuth.verifyCurrentUserAttributeSubmit("email", fields.code);
    
    // const user = await Auth.currentAuthenticatedUser();
    // Auth.updateUserAttributes(user,{email:attributes.email});
    // const registerSubmit = (event) => {
    //     event.preventDefault();
    //     setProcessing(true);
    //     COPYAuth.verifyCurrentUserAttributeSubmit("email", fields.code);
    //     };
    // console.log(Username);
    const usernameSubmit=(event)=>{
        event.preventDefault();
    }
    const emailCLick=()=>{
        setEmailbutton(true)
    }
     const saveChanges=()=>{
        //  setSubmit(!submit)
        if (Submit == true){
            setSubmit(false)
            setEmailbutton(false)
            // console.log(Submit);
        }
        else{
            setSubmit(true)
        console.log(Submit)}
     }
    return(
        
        <div className = "edit-profile-page-content">
                            
               
                <div className="header-5 Profile-edit-profile" style={{ width: '100%' }}>Profile</div>
                
                <br/>
                
                <div classname="user-initials-edit-profile">
                    <div className="edit-profile-page-contianer">
                         <p className="header-4 username-edit-profile" data-letters={(Firstchar)}   > </p>
                         <div className="header-4 username">{(username)}</div>    
                     </div>
                     
                </div>

            <form className="edit-profile-section"
            action="/"
            id="register"
            onSubmit={usernameSubmit}
            >
        <div className="edit-profile-container">
        
            <div className="edit-profile-sub-container">
                       
        <div className= "edit-profile-overview-container header-5">Overview
        {Submit ?( <p className="header-5 edit-profile-overview" style={{ float: 'left' ,width:'415'}}>    
                  <span
                  
                    className="Save-changes-edit-profile"
                    type="submit"
                    value="Submit"
                    onClick={saveChanges}
                  >Save changes</span>
                  </p>):(     <p className="header-5 edit-profile-overview" style={{ float: 'left' ,width:'415'}}>
                  <img
                    src={Editicon}
                    className="edit-pointer-edit-profile"
                    onClick={saveChanges}
                  ></img> <img className="edit-pointertext-edit-profile" src={Edit} onClick={saveChanges}></img>
                  </p>)}
                  
            
        </div>

        <br/><br/>


        <div className=" edit-profile-input-container" >
            
        <div className="header-8 username-box" >Username</div>
                <div className="username-box-container">
                {Submit?(
                <InputOne
                id='third_slot'
                type='text'
                
                placeholder='Username'
                is_required={true}
                >
                </InputOne>    
                ):(<InputOne
                    id='third_slot'
                    type='text'
                    
                    placeholder='Username'
                    is_required={true}
                    is_disabled={true}
                    ></InputOne>)}
                </div>
            </div>
            
            <div className="edit-profile-input-container" >
            <div className="header-8 input-email-edit-profile" style={{ float: 'left',marginBottom:"6px" }}>Email</div>
            
            <div className="email-box-edit-profile" >
            
            <div className="email-container-box">
            <InputOne
                id='second_slot'
                type='text'
                placeholder={userEmail}
                is_disabled = {true}
                ></InputOne> 
                </div>

                {Submit ?(<div className="email-warning">Sorry, You cannot change the Email Rhythm</div>):(<div></div>)}

                 </div>
                 {/* {Submit?(<span className="email-edit-warning">You cannot change your email address</span>):(<p></p>)} */}
           
            </div>
            
            <div className="reset-passwor">
                <p className="forgot-footer">
                    <a href="/forgot" className="body-2 signin-link">
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