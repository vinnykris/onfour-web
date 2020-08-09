import React from "react";

import { Row, Col } from "../grid";

const UserCrews = ({ userCrews }) => {
  return (
    <Row>
      <Col size={1}>
        <Row>
          {userCrews.map((crew) => (
            <div
              key={crew.name}
              style={{ backgroundColor: crew.color }}
              className="crew-stub-wrapper"
            >
              <Row className="crew-stub-title">
                <p title={crew.name}>{crew.name}</p>
              </Row>
              <Row className="crew-stub-crew-members">
                {crew.members.slice(0, 3).map((member) => (
                  <Row key={member.email} className="crew-stub-member">
                    <div className="crew-stub-member-initial" style={{ color: crew.color }}>
                      {member.username.length > 0
                        ? member.username[0].toUpperCase()
                        : member.email[0].toUpperCase()}
                    </div>
                    <div className="crew-stub-member-data-wrapper">
                      <p className="crew-stub-member-data-username">
                        {member.username.length > 0
                          ? member.username
                          : member.email}
                      </p>
                      <p className="crew-stub-member-data-email">
                        {member.email}
                      </p>
                    </div>
                  </Row>
                ))}
              </Row>
              <Row className="crew-stub-options">
                <p>...</p>
              </Row>
            </div>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default UserCrews;
