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
  const [concert_fee, setConcertFee] = useState(0.0);
  const [service_fee, setServiceFee] = useState(0.0);
  const [processing_fee, setProcessingFee] = useState(0.0);
  const [disclaimer_text, setDisclaimerText] = useState("");

  const { height, width } = useWindowDimensions(); // Dimensions of screen

  useEffect(() => {
    if (props.total === 0 || !props.total) {
      setAllowCustomPrice(true);
    } else {
      setAllowCustomPrice(false);
      setUserPrice(props.total);
    }
  }, [props]);

  useEffect(() => {
    console.log(allow_custom_price);
    if (allow_custom_price) {
      const subtotal = parseFloat(props.total + user_price, 10);
      setTotalPrice(subtotal);
      if (subtotal > 0) {
        setConcertFee((subtotal * 0.97 - 0.3).toFixed(2));
        setProcessingFee((subtotal - (subtotal * 0.97 - 0.3)).toFixed(2));
      } else {
        setConcertFee(0.0);
        setProcessingFee(0.0);
      }
    } else {
      const subtotal = parseFloat(props.total, 10).toFixed(2);
      console.log(subtotal);
      if (subtotal > 0) {
        const concert_charge = parseFloat(subtotal, 10);
        //const service_charge = parseFloat(concert_charge * 0.15, 10);
        const service_charge = concert_charge * 0.15;
        const processing_charge =
          (concert_charge + service_charge + 0.3) / 0.97 -
          concert_charge -
          service_charge;
        const total_charge =
          concert_charge + service_charge + processing_charge;
        // setConcertFee(parseFloat(subtotal, 10).toFixed(2));
        // setServiceFee(parseFloat(subtotal, 10).toFixed(2) * 0.15);
        // setProcessingFee((subtotal * 0.03 + 0.3).toFixed(2));
        // setTotalPrice((subtotal * 1.18 + 0.03).toFixed(2));
        setConcertFee(concert_charge.toFixed(2));
        setServiceFee(service_charge.toFixed(2));
        setProcessingFee(processing_charge.toFixed(2));
        setTotalPrice(total_charge.toFixed(2));
      } else {
        setConcertFee(0.0);
        setProcessingFee(0.0);
        setTotalPrice(0.0);
      }
    }
  }, [user_price]);

  useEffect(() => {
    if (suggested_price > 0 && minimum_price > 0) {
      setUserPrice(suggested_price);
      setDisclaimerText(`Minimum price is $${minimum_price}.`);
    } else if (suggested_price > 0) {
      setUserPrice(suggested_price);
      if (props.concert_id === "925d2552-7e18-4507-b293-89e4322be5fa") {
        setDisclaimerText(`Minimum price is $${suggested_price}.`);
      } else {
        setDisclaimerText(`Suggested price is $${suggested_price}.`);
      }
    } else if (minimum_price > 0) {
      setDisclaimerText(`Minimum price is $${minimum_price}.`);
    }
  }, [suggested_price, minimum_price]);

  useEffect(() => {
    if (minimum_price > 0) {
      setUserPrice(suggested_price);
    }
  }, [minimum_price]);

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
      <Row className="ticket-modal-header">
        <Col size={1}>
          <h4 className="checkout-modal-header-text header-5">
            {props.artist_name}
          </h4>
          <p className="subtitle-2">{props.concert_full_time}</p>
        </Col>
      </Row>
      <Row className="ticket-modal-body">
        <div className="ticket-modal-container">
          {width > 600 ? (
            <div>
              {allow_custom_price ? (
                <div className="custom-ticket-summary-form">
                  <form
                    className="name-your-price-container"
                    id="pay-as-you-want-price-form"
                    onSubmit={addFreeTicket}
                  >
                    <div className="name-your-price-text-container">
                      <span className="ticket-summery-field align-left subtitle-1">
                        Name your price:
                      </span>
                      <span className="ticket-disclaimer subtitle-3">
                        {disclaimer_text}
                      </span>
                      {props.concert_id ===
                      "925d2552-7e18-4507-b293-89e4322be5fa" ? (
                        <span className="ticket-disclaimer subtitle-3">
                          Free entry for students. Enter $0.
                        </span>
                      ) : null}
                    </div>
                    {suggested_price ? (
                      <NumberFormat
                        className="custom-ticket-form-input body-1 short-width-input"
                        name="amount"
                        placeholder="USD"
                        value={user_price}
                        onChange={(event) => {
                          setUserPrice(event.target.value.substring(1));
                          if (event.target.value == "") {
                            setIsUserPriceInput(false);
                          } else {
                            setIsUserPriceInput(true);
                          }
                        }}
                        prefix="$"
                        decimalScale={2}
                        required
                        allowNegative={false}
                      />
                    ) : (
                      <div className="name-your-price-input">
                        {minimum_price ? (
                          <NumberFormat
                            className="custom-ticket-form-input body-1 short-width-input"
                            name="amount"
                            placeholder="USD"
                            // value={entered_value}
                            onChange={(event) => {
                              setUserPrice(event.target.value.substring(1));
                              if (event.target.value == "") {
                                setIsUserPriceInput(false);
                              } else {
                                setIsUserPriceInput(true);
                              }
                            }}
                            prefix="$"
                            decimalScale={2}
                            required
                            allowNegative={false}
                            isAllowed={(value) => value >= minimum_price}
                          />
                        ) : (
                          <NumberFormat
                            className="custom-ticket-form-input body-1 short-width-input"
                            name="amount"
                            placeholder="USD"
                            // value={entered_value}
                            onChange={(event) => {
                              setUserPrice(event.target.value.substring(1));
                              if (event.target.value == "") {
                                setIsUserPriceInput(false);
                              } else {
                                setIsUserPriceInput(true);
                              }
                            }}
                            prefix="$"
                            decimalScale={2}
                            required
                            allowNegative={false}
                          />
                        )}
                      </div>
                    )}
                  </form>
                  <div className="fee-receipt-small">
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-1">
                        1x General Admission
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-1">
                          ${concert_fee}
                        </span>
                      </div>
                    </div>
                    {checked_backstage_pass ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-1">
                          1x Backstage Pass
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-1">
                            ${props.backstage_price}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {service_fee > 0 ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-1">
                          Service Fee
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-1">
                            ${service_fee}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-1">
                        Processing Fee
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-1">
                          ${processing_fee}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ticket-total-container top-border">
                    <div className="ticket-summery-field align-right subtitle-1 total-text">
                      {`Total: $${total_price}`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ticket-summary-form">
                  <div className="fee-receipt">
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-1">
                        1x General Admission
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-1">
                          ${concert_fee}
                        </span>
                      </div>
                    </div>

                    {checked_backstage_pass ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-1">
                          1x Backstage Pass
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-1">
                            ${props.backstage_price}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {service_fee > 0 ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-1">
                          Service Fee
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-1">
                            ${service_fee}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-1">
                        Processing Fee
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-1">
                          ${processing_fee}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ticket-summery-field align-right subtitle-1 top-border total-text">
                    {`Total: $${total_price}`}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {allow_custom_price ? (
                <div className="custom-ticket-summary-form">
                  <form
                    className="name-your-price-container"
                    id="pay-as-you-want-price-form"
                    onSubmit={addFreeTicket}
                  >
                    <div className="name-your-price-text-container">
                      <span className="ticket-summery-field align-left subtitle-2">
                        Name your price:
                      </span>
                      <span className="ticket-disclaimer subtitle-3">
                        {disclaimer_text}
                      </span>
                      {props.concert_id ===
                      "925d2552-7e18-4507-b293-89e4322be5fa" ? (
                        <span className="ticket-disclaimer subtitle-3">
                          Free entry for students. Enter $0.
                        </span>
                      ) : null}
                    </div>
                    {suggested_price ? (
                      <NumberFormat
                        className="custom-ticket-form-input body-1 short-width-input"
                        name="amount"
                        placeholder="USD"
                        value={user_price}
                        onChange={(event) => {
                          setUserPrice(event.target.value.substring(1));
                          if (event.target.value == "") {
                            setIsUserPriceInput(false);
                          } else {
                            setIsUserPriceInput(true);
                          }
                        }}
                        prefix="$"
                        decimalScale={2}
                        required
                        allowNegative={false}
                      />
                    ) : (
                      <div className="mobile-custom-price-input">
                        {minimum_price ? (
                          <NumberFormat
                            className="custom-ticket-form-input body-1 short-width-input"
                            name="amount"
                            placeholder="USD"
                            // value={entered_value}
                            onChange={(event) => {
                              setUserPrice(event.target.value.substring(1));
                              if (event.target.value == "") {
                                setIsUserPriceInput(false);
                              } else {
                                setIsUserPriceInput(true);
                              }
                            }}
                            prefix="$"
                            decimalScale={2}
                            required
                            allowNegative={false}
                            isAllowed={(value) => value >= minimum_price}
                          />
                        ) : (
                          <NumberFormat
                            className="custom-ticket-form-input body-1 short-width-input"
                            name="amount"
                            placeholder="USD"
                            // value={entered_value}
                            onChange={(event) => {
                              setUserPrice(event.target.value.substring(1));
                              if (event.target.value == "") {
                                setIsUserPriceInput(false);
                              } else {
                                setIsUserPriceInput(true);
                              }
                            }}
                            prefix="$"
                            decimalScale={2}
                            required
                            allowNegative={false}
                          />
                        )}
                      </div>
                    )}
                  </form>
                  <div className="fee-receipt-small">
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-2">
                        1x General Admission
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-2">
                          ${concert_fee}
                        </span>
                      </div>
                    </div>
                    {checked_backstage_pass ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-2">
                          1x Backstage Pass
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-2">
                            ${props.backstage_price}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {service_fee > 0 ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-2">
                          Service Fee
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-2">
                            ${service_fee}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-2">
                        Processing Fee
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-2">
                          ${processing_fee}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ticket-total-container top-border">
                    <div className="ticket-summery-field align-right subtitle-2 total-text">
                      {`Total: $${total_price}`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ticket-summary-form">
                  <div className="fee-receipt">
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-2">
                        1x General Admission
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-2">
                          ${props.general_price}
                        </span>
                      </div>
                    </div>

                    {checked_backstage_pass ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-2">
                          1x Backstage Pass
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-2">
                            ${props.backstage_price}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {service_fee > 0 ? (
                      <div className="ticket-item-container">
                        <div className="ticket-summary-field-2 align-left subtitle-2">
                          Service Fee
                        </div>
                        <div className="item-price-container">
                          <span className="item-price subtitle-2">
                            ${service_fee}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    <div className="ticket-item-container">
                      <div className="ticket-summary-field-2 align-left subtitle-2">
                        Processing Fee
                      </div>
                      <div className="item-price-container">
                        <span className="item-price subtitle-2">
                          ${processing_fee}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ticket-summery-field align-right subtitle-2 top-border total-text">
                    {`Total: $${total_price}`}
                  </div>
                </div>
              )}
            </div>
          )}

          <TicketBox
            auth={props.auth}
            user_email={props.user_email}
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
