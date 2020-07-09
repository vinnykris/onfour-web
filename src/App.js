// React imports
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

// Component imports
import NavBar from "./components/navbar/navbar";
import About from "./components/about_page/about_page";
import StreamPage from "./components/stream_page/stream_page";
import UpcomingShowPage from "./components/upcoming_show_page/upcoming_show";
import Ticket from "./components/payment/payment_box";
import ArchivePage from "./components/archive_page/archive_page";
import ArtistsPage from "./components/artist_page/artist_page";
import Footer from "./components/footer/footer";
import Modal from "./components/sign_in_modal/sign_in_modal";
import Forgot from "./components/forgot_page/forgot_page";
import SoundCheck from "./components/soundcheck_page/soundcheck_page";
import Register from "./components/register_page/register_page";
import Login from "./components/login_page/login_page";

// Bootstrap import
import "bootstrap/dist/js/bootstrap.min.js";

// Styles imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles.scss";

// Amplify imports
import Amplify from "aws-amplify";
import awsconfig from "./apis/aws-exports";

require("dotenv").config();
Amplify.configure(awsconfig);

// Main App component
function App() {
  return (
    <div className="App custom-app">
      <Router history={history}>
        <NavBar />

        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/archive" component={ArchivePage} />
          <Route path="/stream" component={StreamPage} />
          <Route path="/upcoming" component={UpcomingShowPage} />
          <Route path="/ticket" component={Ticket} />
          <Route path="/artists" component={ArtistsPage} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/soundcheck" component={SoundCheck} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
        <Modal></Modal>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
