// React Imports
import React, { useState } from "react";

// Styles Imports
import "./privacy_page.scss";

const TermsOfService = () => {
  // AUTO-SCROLL SECTION
  // Auto-scrolls on first navigation
  const [scroll, setScroll] = useState(true); // Auto-scroll
  if (scroll) {
    window.scrollTo({ top: "10px", behavior: "smooth" });
    setScroll(false);
  }
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header header-3">Ticket Policy</div>
        <div className="header-4">Ticket Policy & Age Verification</div>
        <p className="body-1 policy-body">
          After you have created an onfour “Account” and have successfully
          purchased or otherwise acquired a “Ticket” to the Event, you will
          receive a ticket confirmation receipt via email. By purchasing a
          “Ticket” to the Event, You agree that any and all Ticket-Holders,
          patrons and/or any other individual watching, listening or otherwise
          accessing the Event are at least eighteen (18) years of age and older
          with a valid State Issued Identification. For avoidance of any doubt,
          State Issued Identification include: a validly-issued state driver’s
          license, passport, military ID, and/or non-driver’s license. Since a
          strict age restriction applies to the Event, no individual under
          eighteen (18) years of age will be allowed to watch, listen and/or
          otherwise access the Event, so please be aware that if onfour obtains
          information that You and/or any other individual watching, listening
          or otherwise accessing the Event are under eighteen (18) years of age,
          Your access to the Event will be immediately restricted without any
          refund, remuneration and/or any other reimbursement due to Your
          fraudulent misrepresentation upon purchase of the “ticket” to the
          Event.
        </p>
        <br></br>
        <div className="header-4">Refund Policy </div>
        <p className="body-1 policy-body">
          All sales are final! There are no refunds or exchanges! We are
          therefore not responsible for any technical, sound or other
          audio-visual defect or other related issues, whether on ONFOUR’s side
          or due to the Participating Artist at the Event. However, if the event
          date changes or there is an occurrence of a natural disaster, then the
          ticket holder will receive a refund of the ticket purchase price or
          may exchange it for the changed date. In the highly unlikely event
          that any relevant refunds are available due to an unforeseen and
          unfixable situation, you will be contacted with appropriate
          information.
        </p>
        <br></br>
        <div className="header-4">Technology Policy </div>
        <p className="body-1 policy-body">
          By purchasing said ticket and attending said event at the listed
          premises, you acknowledge and hereby agree that you have been informed
          and understand that ONFOUR INC (“Event Host”) and the Performing
          Artist is producing a live-streaming program and you acknowledge that
          live-streaming and the like are new, unstable and potentially
          unpredictable means of transmission.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          In consideration of the opportunity to watch, experience and attend
          said with the Performing Artist, I do hereby release, hold harmless
          and forever discharge and agree not to sue Event Host or any of its
          trustees, officers, agents, and employees (collectively “Hosts”), from
          any and all claims, responsibilities or liabilities for injury or
          damages resulting from or arising out of my purchase, use and/or
          attendance of the Events.
        </p>
        {/* <p><a href="https://getterms.io" title="Generate a free terms of use document">Terms of Use created with GetTerms.</a></p> */}
      </div>
    </div>
  );
};

export default TermsOfService;
