// React Imports
import React, { useState } from "react";

// AWS Impoorts
import * as mutations from "../../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../../apis/subscription_db";
import { API, graphqlOperation } from "aws-amplify";

// Styling Imports
import { Grid, Row, Col } from "../grid";
import "./upcoming_show_page_styles.scss";

Amplify.configure(awsmobile);

// Upcoming_show contains the layout for upcoming show page
// Currently it's not fully implemented, changes will be made in the near future
const UpcomingShow = () => {
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      paid: false,
    };

    API.graphql(
      graphqlOperation(mutations.createEmailSubscription, { input: payload })
    );

    setEmail("");
    setClicked(true);
  };
  return (
    <div className="upcoming-page-content">
      <Grid>
        <Row></Row>
        <Row>
          <Col size={2}></Col>
          <Col size={2}> </Col>
          <Col size={2}>
            {" "}
            <h1>{"Coming Soon!"}</h1>
          </Col>
          <Col size={2}> </Col>
          <Col size={2}> </Col>
        </Row>
        <Row></Row>
        <br></br>
        <br></br>
        <Row>
          <Col size={1}> </Col>
          <Col size={2}>
            <p className="subscribe-description">
              To stay informed about upcoming events, subscribe to our mailing
              list:
            </p>
          </Col>
          <Col size={1}> </Col>
        </Row>
        <Row>
          <Col size={1}>
            {(() => {
              if (clicked) {
                return (
                  <p className="subscribe-success">Thank you and stay tuned!</p>
                );
              } else {
                return (
                  <form
                    className="inline-form-2"
                    action="/"
                    id="newsletter"
                    onSubmit={onSubmit}
                  >
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email here..."
                        name="email"
                        required
                        value={email}
                        className="email-input-upcoming"
                        // style={{ width: "280px" }}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <button
                        type="submit"
                        form="newsletter"
                        value="Submit"
                        className="submit-button button-border button-height"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                );
              }
            })()}
          </Col>
        </Row>
        <br></br>
        <br></br>
      </Grid>
    </div>
  );
};

export default UpcomingShow;

{
  /*

const upcoming_show = () => {
  return (
    <div>
      <Grid>
        <Row></Row>
        <Row>
          <Col size={1}></Col>
          <Col size={3}>
            <FeaturedContent
              img={jon_may_10}
              name={"Jonathan Dely"}
              date={"05/10/2020"}
              time={"8PM EST"}
            />
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={2}>
            <FeaturedContent
              img={concert}
              name={"Jonathan Dely"}
              date={"05/10/2020"}
              time={"8PM EST"}
            />
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row>
          <Col size={1}></Col>
          <Col size={2}>
            <FeaturedContent
              img={concert}
              name={"Jonathan Dely"}
              date={"05/10/2020"}
              time={"8PM EST"}
            />
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row></Row>
      </Grid>
    </div>
  );
};

export default upcoming_show;

*/
}
