import React from "react";
import NavBar from "./components/short_term_components/navbar_short_term";
import About from "./components/about_page/about_page_short_term";
import StreamPage from "./components/stream_page";
import ArchivePage from "./components/archive_page";
import Footer from "./components/footer";
import "./App.css";
import "./styles.scss";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

function AppShortTerm() {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/archive" component={ArchivePage} />
          <Route path="/stream" component={StreamPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default AppShortTerm;
