import React from "react";
import NavBar from "./components/navbar/navbar_short_term";
import About from "./components/about_page/about_page_short_term";
import StreamPage from "./components/stream_page/stream_page";
import UpcomingShowPage from "./components/upcoming_show_page/upcoming_show";
import ArchivePage from "./components/archive_page/archive_page";
import Footer from "./components/footer/footer";
import "./App.css";
import "./styles.scss";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

require('dotenv').config();

function AppShortTerm() {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/archive" component={ArchivePage} />
          <Route path="/stream" component={StreamPage} />
          <Route path="/ticket" component={UpcomingShowPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default AppShortTerm;
