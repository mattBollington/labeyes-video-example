import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPane from "./components/ManePane/ManePane";

const App: React.FC = () => {
  return (
    <div className="appContainer" data-testid="app-container">
      <div className="contentContainer">
        <Sidebar />
        <div className="headerAndMainContainer">
          <Header />
          <MainPane />
        </div>
      </div>
    </div>
  );
};

export default App;
