// React Imports
import React, { useState } from "react";

// Styles Imports
import "./privacy_page.scss";

const PrivacyPage = () => {
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
        <div className="privacy-header header-3">Privacy Policy</div>
        <p className="body-1 policy-body">
          Your privacy is important to us. It is onfour's policy to respect your
          privacy regarding any information we may collect from you across our
          website, <a href="http://onfour.live">http://onfour.live</a>, and
          other sites we own and operate.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorized access, disclosure, copying, use or
          modification.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          When you visit our website, we access your IP address and standard web
          log information, such as your browser type and the pages you accessed
          on our website. We also may collect certain geo-location information.
          In addition, when obtaining a ticket to an event hosted on our site,
          we provide the option to add the event to your Google Calendar. This
          requires you to authorize us to access your Google account. We do not
          access any private information, nor do we store any of your private
          information.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          We don’t share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
        <br></br>
        <p className="body-1 policy-body">
          This policy is effective as of 16 July 2020.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
