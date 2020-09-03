// React Imports
import React from "react";
import { Grid, Row, Col } from "../grid";

// Styling Imports
import "./checkout_styles.scss";

import TicketBox from "./ticket_box";

const PayTicketBox = (props) => {
    const checked_backstage_pass = (props.total === props.general_price + props.backstage_price && props.backstage_price > 0);

    return (
        <Grid className="checkout-modal-grid">
            <i className="fas fa-angle-left go-back-arrow" onClick={props.goBackToModal}></i>
            <Row className="ticket-modal-header">
                <Col size={1}>
                    <h4 className="checkout-modal-header-text header-5">
                        Order Summery
                    </h4>
                </Col>
            </Row>
            <Row className="ticket-modal-body">
                <div className="ticket-modal-container">
                    {checked_backstage_pass ? (
                        <div className="ticket-summery-form">
                            <div className="ticket-summery-field lh-33 align-left subtitle-1">1x General Admission ticket</div>
                            <div className="ticket-summery-field lh-33 align-left subtitle-1">1x Backstage Pass</div>
                            <div className="ticket-summery-field lh-33 align-right subtitle-1 top-border">{"Total: $" + props.total.toString() + ".00"}</div>
                        </div>
                    ) : (
                            <div className="ticket-summery-form">
                                <div className="ticket-summery-field align-left subtitle-1">1x General Admission ticket</div>
                                <div className="ticket-summery-field align-right subtitle-1 top-border">{"Total: $" + props.total.toString() + ".00"}</div>
                            </div>
                        )}
                    <TicketBox
                        amount_value={props.total}
                        addTicket={props.addTicket}
                    ></TicketBox>
                </div>
            </Row>
        </Grid>
    );
}

export default PayTicketBox; 