import React from "react";
import ConcertInfo from "./concert_info";

const ConcertInfoModal = ({descriptions}) => {
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
            <ConcertInfo descriptions={descriptions}></ConcertInfo>
        </div>
    );
};

export default ConcertInfoModal;