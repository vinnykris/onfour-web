import React from "react";
import NavBar from "./components/navbar";
import MusicianPage from "./components/musician_page";
import MainContent from "./components/main_content";
import "./App.css";
import "./styles.scss";
import musicianbackground from "./images/musician_background.jpg";
import homebackground from "./images/home_page_background.jpeg";
import WhatsOnFour from "./components/whatsonfour";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainContent />
    </div>
  );
}

export default App;
