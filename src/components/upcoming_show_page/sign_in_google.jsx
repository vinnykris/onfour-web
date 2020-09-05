import React, {useState} from "react";
import ApiCalendar from "../google_calender/google_calendar_api";


function GoogleSignIn() {
    
    const [need_sign_in, setNeedSignIn] = useState(true);

    const handleItemClick = (name) => {
        // console.log(name);
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
            setNeedSignIn(false)
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
            setNeedSignIn(true);
        }
    };
    
    return (
        <div>
            {need_sign_in? (
            <div className="google-signin"
                onClick={handleItemClick("sign-in")}
            >
                sign-in
            </div>
            ) : (
            <div className="google-signin"
                onClick={handleItemClick("sign-out")}
            >
                sign-out
            </div>
            )}
        </div>
    );
   
}
export default GoogleSignIn;