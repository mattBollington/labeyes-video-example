import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPane from "./components/ManePane/ManePane";

const App: React.FC = () => {
  return (
    <div className="appContainer">
      <div className="contentContainer">
        <Sidebar />
        <div className="headerAndMainContainer">
          <Header />
          <MainPane videoSrc="https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.mp4" />
        </div>
      </div>
    </div>
  );
};

export default App;
