
// // Main App component
import React from "react";
import { Router, Switch, Route, withRouter } from "react-router-dom";
import history from "./history";

// Component imports
import NotFound404 from "./components/not_found_page/not_found404";
import NotFoundPage from "./components/not_found_page/not_found_page"
import NavBar from "./components/navbar/navbar";
import About from "./components/about_page/about_page";
import StreamPage from "./components/stream_page/stream_page";
import UpcomingShowPage from "./components/upcoming_show_page/upcoming_show";
import ArchivePage from "./components/archive_page/archive_page";
import ArtistsPage from "./components/artist_page/artist_page";
import Footer from "./components/footer/footer";
import Forgot from "./components/forgot_page/forgot_page";
import SoundCheck from "./components/soundcheck_page/soundcheck_page";
import Concert from "./components/concert_page/concert";
import Profile from "./components/user_profile/profile";
import Register from "./components/register_page/register_page";
import Login from "./components/login_page/login_page";
import ArtistForm from "./components/artist_form/artist_form";
import PrivacyPage from "./components/policies/privacy_page";
import TermsOfService from "./components/policies/terms_of_service";

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
          <Route exact path="/archive" component={ArchivePage} />
          <Route exact path="/stream" component={StreamPage} />
          <Route exact path="/upcoming" component={UpcomingShowPage} />
          <Route exact path={`/upcoming/:showID`} component={Concert} />
          <Route exact path="/artists" component={ArtistsPage} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/soundcheck" component={SoundCheck} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/form" component={ArtistForm} />
          <Route exact path="/privacy-policy" component={PrivacyPage} />
          <Route exact path="/terms-of-service" component={TermsOfService} />
          <Route path="*" component={NotFoundPage}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;