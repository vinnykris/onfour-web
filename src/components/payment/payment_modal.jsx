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

{/* <div className="modal-dialog" role="document">
    <div className="modal-content">
        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thank You for Your Donation!</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
        <Payment_box></Payment_box>
        <div className="modal-body">
                        <Payment_box></Payment_box>
                    </div>
        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
    </div>
</div> */}