import React from 'react';
import Payment_box from "./payment_box";


const modal = () => {
    return (
        <div className="modal" id="exampleModal" tapindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Payment_box></Payment_box>
        </div>
    );
}

export default modal;
