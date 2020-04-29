// history source: https://medium.com/@bsangars15/react-button-click-navigate-to-new-page-6af7397ea220

import React from "react";
import NavBar from "./components/navbar";
import MusicianPage from "./components/musician_page";
import MainContent from "./components/main_content";
import WhatsOnFour from "./components/whatsonfour";
import Hosts from "./components/hosts";
import HostApplication from "./components/apply_to_host";
import MusicianApplication from "./components/apply_to_perform";
import HostAgain from "./components/host_again";
import PerformAgain from "./components/perform_again";
import "./App.css";
import "./styles.scss";
import { Router, Switch, Route } from "react-router-dom";
import musicianbackground from "./images/musician_background.jpg";
import homebackground from "./images/home_page_background.jpeg";
import history from "./history";

require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        {/* <MainContent /> */}
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route path="/whatisonfour" component={WhatsOnFour} />
          <Route path="/musicians" component={MusicianPage} />
          <Route path="/hosts" component={Hosts} />
          <Route path="/apply_to_host" component={HostApplication} />
          <Route path="/apply_to_perform" component={MusicianApplication} />
          <Route path="/host_again" component={HostAgain} />
          <Route path="/perform_again" component={PerformAgain} />
          {/*<Route component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
