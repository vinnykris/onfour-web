import React, { useState, useEffect } from "react";
import Rodal from "rodal";

// Graphql Imports
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

import { getOneConcert, getArtistInfo } from "../../apis/get_concert_data";

import emailjs from "emailjs-com";
import {
  service_id,
  template_id,
  rsvp_template_id,
  user_id,
} from "../../apis/email_js";
import { API, graphqlOperation } from "aws-amplify";

import "./access_modal_styles.scss";

import PayTicketBox from "../payment/pay_ticket_box";

const TicketModal = (props) => {
  const [total, setTotal] = useState(0);
  const [username, setUsername] = useState("");
  const [user_email, setUserEmail] = useState("");

  useEffect(() => {
    console.log(props);
  }, []);

  useEffect(() => {
    console.log(props);
    if (props.concert_info) {
      setTotal(props.concert_info.price);
    }
    setUsername(props.username);
    setUserEmail(props.user_email);
  }, [props]);

  const sendEmailConfirmation = (
    username,
    artist_name,
    concert_id,
    email_recipient,
    date,
    time
  ) => {
    const template_params = {
      email_recipient: email_recipient,
      reply_to: "info@onfour.live",
      username: username,
      artist_name: artist_name,
      time: time,
      date: date,
      concert_id: concert_id,
    };
    setTimeout(() => {
      emailjs.send(service_id, rsvp_template_id, template_params, user_id);
    }, 1000);
  };

  // Function called when user purchases/obtains ticket from modal
  // First adds ticket to user's profile in database
  // Then hides the modal and shows the ticket stub
  // Calls function that sends emails to invited users
  const addTicket = async (email) => {
    if (props.auth) {
      const user_data = await API.graphql(
        graphqlOperation(queries.get_user_data, {
          input: username,
        })
      );
      const current_concert_data =
        user_data.data.getCreateOnfourRegistration.concert;
      //const user_name = user_data.data.getCreateOnfourRegistration.first;
      if (!current_concert_data || !isNaN(parseInt(current_concert_data))) {
        var concert_data = {};
      } else {
        var concert_data = JSON.parse(current_concert_data);
      }
      concert_data[props.concert_info.id] = true;
      const user_payload = {
        username,
        concert: JSON.stringify(concert_data),
      };
      API.graphql(
        graphqlOperation(mutations.update_user, {
          input: user_payload,
        })
      );
    }

    const concert_rsvp_info = await getOneConcert(props.concert_info.id);
    const rsvp_list = [...concert_rsvp_info.rsvp_list, email];

    const concert_payload = {
      id: props.concert_info.id,
      rsvp_list: rsvp_list,
    };

    API.graphql(
      graphqlOperation(mutations.add_rsvp, {
        input: concert_payload,
      })
    );
    // setHasTicket(true);
    // setNumTickets(num_tickets + 1);

    if (props.auth) {
      sendEmailConfirmation(
        username,
        props.concert_info.artist_name,
        props.concert_info.id,
        email,
        props.concert_info.formatted_date,
        props.concert_info.formatted_time
      );
    } else {
      console.log(email);
      sendEmailConfirmation(
        email,
        props.concert_info.artist_name,
        props.concert_info.id,
        email,
        props.concert_info.formatted_date,
        props.concert_info.formatted_time
      );
    }

    props.onTicketingComplete();
    //sendEmailInvites(user_name);
  };

  return (
    <div>
      {props.is_mobile ? (
        <Rodal
          visible={props.visible}
          onClose={props.onClose}
          width={100}
          height={100}
          measure="%"
          customStyles={{
            padding: 0,
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
            total={total}
            addTicket={addTicket}
            concert_id={props.concert_info.id}
          ></PayTicketBox>
        </Rodal>
      ) : (
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
            total={total}
            addTicket={addTicket}
            concert_id={props.concert_info.id}
          ></PayTicketBox>
        </Rodal>
      )}
    </div>
  );
};

export default TicketModal;
