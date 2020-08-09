import React from "react";

import { Row, Col } from "../grid";

const UserCrews = ({ userCrews }) => {
  return (
    <Row>
      <Col size={1}>
        <Row>
          {userCrews.map((crew) => (
            <Col size={1} key={crew.name}>
              <Row>{crew.name}</Row>
              <Row>
                {crew.members.map((member) => (
                  <Row key={member.email}>{member.email}</Row>
                ))}
              </Row>
              <Row>...</Row>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default UserCrews;
