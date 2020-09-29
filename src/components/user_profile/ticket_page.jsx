import React from "react";

import { Row, Col } from "../grid";
import FlexibleGrid from "../flexible_grid/flexible_grid";
import ticketIcon from "../../images/icons/local_activity_24px_outlined.png";

const ticketPage = ({ width, stubs, history }) => {
  return (
    <Col size={7}>
      <Row className="header-section">
        <img src={ticketIcon} className="profile-header-icon"></img>
        <h4 className="profile-preview-content-header username-header header-5">
          My Wallet
        </h4>
      </Row>
      <Row className="profile-section">
        <Col className="profile-column" size={1}>
          {stubs.length > 0 ? (
            <Row>
              <Col size={1} className="stubs-column">
                {width <= 600 ? (
                  <FlexibleGrid content_list={stubs} num_cols={1} />
                ) : (
                  <div>
                    {width <= 1280 ? (
                      <div>
                        {width <= 768 ? (
                          <FlexibleGrid content_list={stubs} num_cols={2} />
                        ) : (
                          <FlexibleGrid content_list={stubs} num_cols={3} />
                        )}
                      </div>
                    ) : (
                      <FlexibleGrid content_list={stubs} num_cols={4} />
                    )}
                  </div>
                )}
              </Col>
            </Row>
          ) : (
            <div className="profile-empty-state">
              <h4 className="empty-state-message body-1">
                Your wallet is empty! Don't worry, we're not talking about your
                real wallet.
              </h4>
              <h5 className="empty-state-message body-1">
                Get your first ticket stub below!
              </h5>
              <button
                className="upcoming-prompt-button primary-button button-text"
                onClick={() => history.push("/upcoming")}
              >
                View Upcoming Shows
              </button>
            </div>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default ticketPage;
