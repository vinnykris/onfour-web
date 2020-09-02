// React Imports
import React, { useState } from "react";
import { Grid, Row, Col } from "../grid";

import Tooltip from "@material-ui/core/Tooltip";
import { NavLink } from "react-router-dom";

// Styling Imports
import "./checkout_styles.scss";
import "rodal/lib/rodal.css";
import "react-multi-email/style.css";
import style from "react-tooltip/dist/style";

const checkoutBox = (props) => {
    const checked_backstage_pass = (props.total === props.general_price + props.backstage_price && props.backstage_price > 0);
    const is_backstage_pass_free = (props.backstage_price === 0);

    const selectBackstagePass = () => {
        if (document.getElementById("backstage-pass-div")) {
            if (document.getElementById("backstage-pass-div").classList.contains("selected-style")) {
                console.log(document.getElementById("backstage-pass-div").classList);
                document.getElementById("backstage-pass-div").classList.remove('selected-style');
                props.setTotal(props.general_price);
            } else {
                if (!document.getElementById("backstage-pass-div").classList.contains("disabled-backstage")) {
                    props.setTotal(props.general_price + props.backstage_price);
                    document.getElementById("backstage-pass-div").classList.add('selected-style');
                }
            }
        }
    }

    return (
        <Grid className="checkout-modal-grid">
            <Row className="checkout-modal-header">
                <Col size={1}>
                    <h4 className="checkout-modal-header-text header-5">
                        {props.artist_name + ": " + props.concert_name}
                    </h4>
                    <p className="subtitle-2">{props.concert_full_time}</p>
                </Col>
            </Row>
            <Row className="checkout-modal-body">
                <div className="checkout-modal-ticket-select-container">
                    <div className="checkout-modal-GA selected-style disabled-GA">
                        <p className="subtitle-1 GA-text">
                            {"General Admission"} <p className="subtitle-2 text-color">{props.general_price ? ("$" + props.general_price.toString()) : "free"}</p>
                        </p>
                    </div>
                    <div 
                        id = "backstage-pass-div" 
                        className={"checkout-modal-GA" + (props.backstage_price ? "" : " disabled-backstage") + ((checked_backstage_pass && selectBackstagePass) ? " selected-style" : "")} 
                        onClick={selectBackstagePass}
                    >
                        <p className="subtitle-1 GA-text">
                            {"Backstage Pass"} <p className="subtitle-2 text-color">{props.backstage_price ? ("$" + props.backstage_price.toString()) : "(not available)"}</p>
                        </p>
                    </div>
                </div>
                {props.username?(
                    props.general_price ? (
                        <button className="checkout-modal-checkout-button button-text" onClick={props.goToCheckout}>
                            CHECK OUT
                        </button>
                    ) : (
                            <button className="checkout-modal-checkout-button button-text" onClick={props.addTicket}>
                                GET TICKET
                            </button>
                        )
                ) : (
                    props.general_price ? (
                        <NavLink
                            to={{
                                pathname: "/login",
                                state: { current: props.location },
                            }}
                        >
                            <button className="checkout-modal-checkout-button button-text">
                                CHECK OUT
                            </button>
                        </NavLink>
                    ) : (
                        <NavLink
                            to={{
                                pathname: "/login",
                                state: { current: props.location },
                            }}
                        >
                            <button className="checkout-modal-checkout-button button-text">
                                GET TICKET
                            </button>
                        </NavLink>
                    )
                )}
            </Row>
        </Grid>
    );
}

export default checkoutBox;