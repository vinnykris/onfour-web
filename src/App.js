import React from "react";
import NavBar from "./components/navbar";
import MusicianPage from "./components/musician_page";
import MainContent from "./components/main_content";
import "./App.css";
import "./styles.scss";
import background from "./images/musician_background.jpg";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainContent />
    </div>
  );
}

export default App;
