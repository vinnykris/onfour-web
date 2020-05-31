import React from "react";
import ConcertInfo from "./concert_info";

const ConcertInfoModal = () => {
    return (
        <div
            className="modal"
            id="concertInfoModal"
            tapindex="-1"
            role="dialog"
            aria-labelledby="concertInfoModalLabel"
            aria-hidden="true"
            data-backdrop="false"
        >
            <ConcertInfo></ConcertInfo>
        </div>
    );
};

export default ConcertInfoModal;