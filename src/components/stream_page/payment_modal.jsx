import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import "./access_modal_styles.scss";


import PayTicketBox from "../payment/pay_ticket_box";

const PaymentModal = (props) => {

  return (
    <div>
                    <Rodal
                visible={props.visible}
                onClose={props.onClose}
                width={50}
                height={96}
                measure="%"
                customStyles={{
                  padding: 0,
                  //overflow: scroll,
                  maxHeight: "632px",
                  maxWidth: "482px",
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #07070F",
                  boxShadow:
                    "0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                }}
                className="rodal-custom"
              >
                <PayTicketBox
                  auth={props.auth}
                  user_email={props.user_email}
                  artist_name={props.concert_info.artist_name}
                  concert_full_time={
                    props.concert_info.week_day +
                    ", " +
                    props.concert_info.formatted_date +
                    ", " +
                    props.concert_info.formatted_time
                  }
                  general_price={props.concert_info.general_price}
                  backstage_price={props.concert_info.backstage_price}
                  suggested_price={props.concert_info.suggested_price}
                  minimum_price={props.concert_info.minimum_price}
                  // total={total}
                  // addTicket={addTicket}
                  concert_id={props.concert_info.id}
                ></PayTicketBox>
              </Rodal>
    </div>
  );
};

export default PaymentModal;
