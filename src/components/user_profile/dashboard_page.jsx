import React from "react";

import { Row, Col } from "../grid";
import FlexibleGrid from "../flexible_grid/flexible_grid";
import dashboardIcon from "../../images/icons/chrome_reader_mode_24px_outlined.png";

import "./profile_styles.scss";

const dashboardPage = ({ width, upcoming_concerts, memories, history }) => {
  return (
    <Col size={7}>
      <Row className="header-section">
        <img src={dashboardIcon} className="profile-header-icon"></img>
        <h4 className="profile-preview-content-header username-header">
          Dashboard
        </h4>
        {/* <h4 className="profile-preview-content-header dashboard-header">
                    Dashboard
                    </h4> */}
        {/* <h4 className="profile-preview-content-header perform-header">I want to perform</h4> */}
      </Row>
      <Row className="profile-section">
        <Col className="profile-column" size={1}>
          {upcoming_concerts.length > 0 ? (
            <div>
              <Row>
                <Col size={1}>
                  <h4 className="profile-preview-content-header">
                    MY UPCOMING SHOWS
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  {width <= 600 ? (
                    <FlexibleGrid
                      content_list={upcoming_concerts}
                      num_cols={1}
                    />
                  ) : (
                    <div>
                      {width < 1280 ? (
                        <div>
                          {width <= 768 ? (
                            <FlexibleGrid
                              content_list={upcoming_concerts}
                              num_cols={3}
                            />
                          ) : (
                            <FlexibleGrid
                              content_list={upcoming_concerts}
                              num_cols={4}
                            />
                          )}
                        </div>
                      ) : (
                        <FlexibleGrid
                          content_list={upcoming_concerts}
                          num_cols={5}
                        />
                      )}
                    </div>
                  )}
                </Col>
              </Row>
              {memories.length > 0 ? (
                <div>
                  <Row>
                    <Col size={1}>
                      <h4 className="profile-preview-content-header">
                        MY MEMORIES
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={1}>
                      {width <= 600 ? (
                        <FlexibleGrid content_list={memories} num_cols={1} />
                      ) : (
                        <div>
                          {width < 1280 ? (
                            <div>
                              {width <= 768 ? (
                                <FlexibleGrid
                                  content_list={memories}
                                  num_cols={3}
                                />
                              ) : (
                                <FlexibleGrid
                                  content_list={memories}
                                  num_cols={4}
                                />
                              )}
                            </div>
                          ) : (
                            <FlexibleGrid
                              content_list={memories}
                              num_cols={5}
                            />
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="profile-empty-state">
              <h4 className="empty-state-message">
                Oops... it looks like you aren't going to any upcoming shows.
              </h4>
              <h5 className="empty-state-message">
                Get your ticket to a show below!
              </h5>
              <button
                className="upcoming-prompt-button"
                onClick={() => history.push("/upcoming")}
              >
                View Upcoming Shows
              </button>
            </div>
          )}

          <div className="user-crews-container ">
            <Row className="user-crews-title">
              <Col size={1}>
                <h4 className="profile-preview-content-header">My Crews</h4>
              </Col>
            </Row>
            <Row>
              <Col size={1}>
                {/* @TODO: Add check for empty array of crews when backend is ready. Right now just displaying basic + */}
                <div className="create-crew-wrapper">
                  <p>Create Crew +</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default dashboardPage;
