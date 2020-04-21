import React from "react";
import NavBar from "./components/short_term_components/navbar_short_term";
import About from "./components/short_term_components/about_page_short_term";
import StreamPage from "./components/stream_page";
import Footer from "./components/footer";
import "./App.css";
import "./styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/chat/stream_chat";

function AppShortTerm() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/stream" component={StreamPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default AppShortTerm;
