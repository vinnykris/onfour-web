import React from "react";
import NavBar from "./components/navbar";
import MainContent from "./components/main_content";
import "./App.css";
import "./styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        {/* <MainContent /> */}
        <Switch>
          <Route exact path="/" component={MainContent} />
          {/* <Route path="/whatisonfour" component={WhatsOnFour} />
          <Route path="/artists" component={Artists} />
          <Route path="/hosts" component={Hosts} />
          <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
