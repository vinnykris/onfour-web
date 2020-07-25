// React imports
import React from "react";
import { Router, Switch, Route,BrowserRouter  } from "react-router-dom";
import history from "./history";
import ReactDOM from "react-dom";
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
import NotFound404 from "./components/not_found_page/not_found404";

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
// function App() {
//   return (
//     <div className="App custom-app">
//       <Router history={history}>
        
//         <NavBar />

//         <Switch>
//           <Route exact path="/" component={About} />
//           <Route path="/archive" component={ArchivePage} />
//           <Route path="/stream" component={StreamPage} />
//           <Route path="/upcoming" component={UpcomingShowPage} />
//           <Route path="/ticket" component={Ticket} />
//           <Route path="/artists" component={ArtistsPage} />
//           <Route path="/forgot" component={Forgot} />
//           <Route path="/soundcheck" component={SoundCheck} />
//           <Route path="/privacy-policy" component={PrivacyPage} />
//           <Route path="/terms-of-service" component={TermsOfService} />
//           <Route path="*" component={NotFoundPage}/>
//         </Switch>
//         <Modal></Modal>
//         <Footer />
//       </Router>
//     </div>
//   );
// }
class App extends React.Component {
  render() {
    const DefaultRoutes = () => {
      return (
        <div className="App custom-app">
          <Router history={history}>
          <NavBar />
          <Switch>
          <Route exact path="/" component={About} />
           <Route path="/archive" component={ArchivePage} />
           <Route path="/stream" component={StreamPage} />
           <Route path="/upcoming" component={UpcomingShowPage} />
           <Route path="/ticket" component={Ticket} />
           <Route path="/artists" component={ArtistsPage} />
           <Route path="/forgot" component={Forgot} />
           <Route path="/soundcheck" component={SoundCheck} />
           <Route path="/privacy-policy" component={PrivacyPage} />
           <Route path="/terms-of-service" component={TermsOfService} />
           <Route path="*" component={NotFound404}/>
          </Switch>
          <Footer />
          </Router>
        </div>
      );
    };

    return (
      <BrowserRouter>
        <Switch>
          <Route component={NotFoundPage} path="/notfound" />
          <Route component={DefaultRoutes} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
