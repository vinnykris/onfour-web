// history source: https://medium.com/@bsangars15/react-button-click-navigate-to-new-page-6af7397ea220

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
// Component Imports
import NavBar from "./components/navbar/navbar";
import MusicianPage from "./components/old_components/musician_page";
import MainContent from "./components/old_components/main_content";
import AboutPage from "./components/about_page/about_page";
import Hosts from "./components/old_components/hosts";
import HostApplication from "./components/old_components/apply_to_host";
import MusicianApplication from "./components/old_components/apply_to_perform";
import HostAgain from "./components/old_components/host_again";
import PerformAgain from "./components/old_components/perform_again";

// Styling Imports
import "./App.css";
import "./styles.scss";

require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        {/* <MainContent /> */}
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route path="/whatisonfour" component={AboutPage} />
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
