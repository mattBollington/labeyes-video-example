import React, { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPane from "./components/ManePane/ManePane";
import { Annotation } from "./types/types";

const App: React.FC = () => {
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );
  return (
    <div className="appContainer" data-testid="app-container">
      <div className="contentContainer">
        <div className="headerAndMainContainer">
          <Header />
          <MainPane setCurrentAnnotation={setCurrentAnnotation} />
        </div>
        <Sidebar currentAnnotation={currentAnnotation} />
      </div>
    </div>
  );
};

export default App;
