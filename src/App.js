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
import Footer from "./components/footer/footer";
import Modal from "./components/sign_in_modal/sign_in_modal";

// Bootstrap import
import "bootstrap/dist/js/bootstrap.min.js";

// Styles imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles.scss";

require("dotenv").config();

// Main App component
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />

        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/archive" component={ArchivePage} />
          <Route path="/stream" component={StreamPage} />
          <Route path="/upcoming" component={UpcomingShowPage} />
          <Route path="/ticket" component={Ticket} />
        </Switch>
        <Modal></Modal>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
