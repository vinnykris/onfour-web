import React from "react";
import TicketBox from "./ticket_box";

const modal = () => {
  return (
    <div
      className="modal"
      id="ticketModal"
      tapindex="-1"
      role="dialog"
      aria-labelledby="ticketModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <TicketBox></TicketBox>
    </div>
  );
};

export default modal;
