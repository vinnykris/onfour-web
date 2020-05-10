import React from 'react';
import Payment_box from "./sign_in";
import "./sign_in_styles.scss";

const modal = () => {
    return (
        <div className="modal" id="sign_in_Modal" tapindex="-1" role="dialog" aria-labelledby="sign_in_ModalLabel" aria-hidden="true">
            <Payment_box></Payment_box>
        </div>
    );
}

export default modal;