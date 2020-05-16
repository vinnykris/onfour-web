import React, { useState } from "react";
import "./chat.scss";
import { Grid, Row, Col } from "../../components/grid";

const Join = ({ joinSubmit, mode }) => {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    if (name.length > 30) {
      alert("Username cannot exceed 30 characters.");
    } else {
      mode = true;
      joinSubmit(name, mode);
    }
  };
  return (
    <div className="join-outer-container">
      <Grid className="join-chat-grid">
        <Row className="full-row">
          <Col size={1}></Col>
          <Col size={2}>
            <div className="join-inner-container">
              <Row>
                <Col size={1}>
                  <h4 className="heading">Join the Chat</h4>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <Row>
                    <Col size={1}>
                      <fieldset>
                        <div className="join-input-container">
                          <input
                            placeholder="Name"
                            className="join-input"
                            type="text"
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                      </fieldset>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={1}>
                      <button
                        className="button mt-20"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Join
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>
      {/* <div className="join-inner-container">
        <h4 className="heading">Join the Chat</h4>
        <fieldset>
        <fieldset>
          <input
            placeholder="Name"
            className="join-input"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />{" "}
        </fieldset>
        <button className="button mt-20" type="submit" onClick={handleSubmit}>
          Join
        </button>
        </fieldset>
      </div> */}
    </div>
  );
};

export default Join;
