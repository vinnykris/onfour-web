import React from "react";
import NavBar from "./components/navbar";
import MusicianPage from "./components/musician_page";
import MainContent from "./components/main_content";
import "./App.css";
import "./styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import musicianbackground from "./images/musician_background.jpg";
import homebackground from "./images/home_page_background.jpeg";
import WhatsOnFour from "./components/whatsonfour";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        {/* <MainContent /> */}
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route path="/whatisonfour" component={WhatsOnFour} />
          <Route path="/artists" component={MusicianPage} />
          {/* <Route path="/hosts" component={Hosts} />
          <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
