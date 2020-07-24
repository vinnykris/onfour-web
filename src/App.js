// React imports
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import NoMatch from 'react-router-nomatch';

// Component imports
import NotFoundPage from "./components/not_found_page/not_found_page"
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
          <Route exact path="/ticket" component={Ticket} />
          <Route exact path="/artists" component={ArtistsPage} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/soundcheck" component={SoundCheck} />
          <Route exact path="/privacy-policy" component={PrivacyPage} />
          <Route exact path="/terms-of-service" component={TermsOfService} />
          <Route path="*" component={NotFoundPage}/>
          <Modal></Modal>
         
        </Switch>
      
        <Footer />
        
      </Router>
    </div>
  );
}

export default App;
