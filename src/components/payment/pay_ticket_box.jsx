// React Imports
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { Grid, Row, Col } from "../grid";

// Styling Imports
import "./checkout_styles.scss";

import TicketBox from "./ticket_box";
import { useWindowDimensions } from "../custom_hooks";

const PayTicketBox = (props) => {
  const checked_backstage_pass =
    props.total === props.general_price + props.backstage_price &&
    props.backstage_price > 0;

  const [user_price, setUserPrice] = useState(0.0);
  const [is_user_price_inputed, setIsUserPriceInput] = useState(false);
  // const [entered_value, setEnteredValue] = useState(null);
  const [total_price, setTotalPrice] = useState(props.total);
  const [allow_custom_price, setAllowCustomPrice] = useState(false);
  const [suggested_price, setSuggestedPrice] = useState(props.suggested_price);
  const [minimum_price, setMinimumPrice] = useState(props.minimum_price);
  const { height, width } = useWindowDimensions(); // Dimensions of screen

  useEffect(() => {
    if (props.total == 0) {
      setAllowCustomPrice(true);
    }
    console.log(props.suggested_price);
  }, []);

  useEffect(() => {
    setTotalPrice(parseFloat(props.total + user_price, 10).toFixed(2));
  }, [user_price]);

  useEffect(() => {
    if (suggested_price > 0) {
      console.log(suggested_price);
      setUserPrice(suggested_price);
    }
  }, [suggested_price]);

  // useEffect(() => {
  //   console.log(entered_value);
  //   if (entered_value == null) {
  //     setUserPrice(0);
  //   } else {
  //     setUserPrice(parseInt(entered_value, 10));
  //   }
  // }, [entered_value]);
  const addFreeTicket = () => {
    props.addTicket();
  };

  return (
    <Grid className="checkout-modal-grid">
      <i
        className="fas fa-angle-left go-back-arrow"
        onClick={props.goBackToModal}
      ></i>
      <Row className="ticket-modal-header">
        <Col size={1}>
          <h4 className="checkout-modal-header-text header-5">Order Summary</h4>
        </Col>
      </Row>
      <Row className="ticket-modal-body">
        <div className="ticket-modal-container">
          {checked_backstage_pass ? (
            <div className="ticket-summery-form">
              {allow_custom_price ? (
                <form
                  className="name-your-price-container"
                  id="pay-as-you-want-price-form"
                  onSubmit={addFreeTicket}
                >
                  {width > 600 ? (
                    <div className="ticket-summery-field align-left subtitle-1">
                      Name your price:
                    </div>
                  ) : (
                    <div className="ticket-summery-field align-left subtitle-2">
                      Name your price:
                    </div>
                  )}
                  {suggested_price ? (
                    <NumberFormat
                      className="custom-ticket-form-input body-1 short-width-input"
                      name="amount"
                      placeholder="USD"
                      value={user_price}
                      onChange={(event) => {
                        setUserPrice(event.target.value.substring(1));
                        setIsUserPriceInput(true);
                      }}
                      prefix="$"
                      decimalScale={2}
                      required
                      allowNegative={false}
                    />
                  ) : (
                    <NumberFormat
                      className="custom-ticket-form-input body-1 short-width-input"
                      name="amount"
                      placeholder="USD"
                      // value={entered_value}
                      onChange={(event) => {
                        setUserPrice(event.target.value.substring(1));
                        setIsUserPriceInput(true);
                      }}
                      prefix="$"
                      decimalScale={2}
                      required
                      allowNegative={false}
                    />
                  )}
                </form>
              ) : (
                <div className="ticket-summery-field align-left subtitle-1">
                  1x General Admission ticket
                </div>
              )}

              <div className="ticket-summery-field align-left subtitle-1">
                1x Backstage Pass
              </div>
              <div className="ticket-summery-field align-right subtitle-1 top-border total-text">
                {`Total: $${total_price}`}
              </div>
            </div>
          ) : (
            <div className="ticket-summery-form">
              {allow_custom_price ? (
                <form
                  className="name-your-price-container"
                  id="pay-as-you-want-price-form"
                  onSubmit={addFreeTicket}
                >
                  {width > 600 ? (
                    <div className="ticket-summery-field align-left subtitle-1">
                      Name your price:
                    </div>
                  ) : (
                    <div className="ticket-summery-field align-left subtitle-2">
                      Name your price:
                    </div>
                  )}
                  {suggested_price ? (
                    <NumberFormat
                      className="custom-ticket-form-input body-1 short-width-input"
                      name="amount"
                      placeholder="USD"
                      value={user_price}
                      onChange={(event) => {
                        setUserPrice(event.target.value.substring(1));
                        setIsUserPriceInput(true);
                      }}
                      prefix="$"
                      decimalScale={2}
                      required
                      allowNegative={false}
                    />
                  ) : (
                    <NumberFormat
                      className="custom-ticket-form-input body-1 short-width-input"
                      name="amount"
                      placeholder="USD"
                      // value={entered_value}
                      onChange={(event) => {
                        setUserPrice(event.target.value.substring(1));
                        setIsUserPriceInput(true);
                      }}
                      prefix="$"
                      decimalScale={2}
                      required
                      allowNegative={false}
                    />
                  )}
                </form>
              ) : (
                <div className="ticket-summery-field align-left subtitle-1">
                  1x General Admission ticket
                </div>
              )}
              <div className="ticket-summery-field align-right subtitle-1 top-border total-text">
                {`Total: $${total_price}`}
              </div>
            </div>
          )}
          <TicketBox
            amount_value={total_price}
            addTicket={props.addTicket}
            is_user_price_inputed={is_user_price_inputed}
            concert_id={props.concert_id}
          ></TicketBox>
        </div>
      </Row>
    </Grid>
  );
};

export default PayTicketBox;
