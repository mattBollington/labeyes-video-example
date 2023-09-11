import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import MainPane from "./components/MainPane/MainPane";
import { Annotation } from "./types/types";

const App: React.FC = () => {
  const [videoSource, setVideoSource] = useState<string>(
    "/FrontendCandidateTest-FINAL.mp4"
  );
  const [dataSource, setDataSource] = useState<string>(
    "/FrontendCandidateTest-FINAL.json"
  );

  const [annotationData, setAnnotationData] = useState<Annotation[] | null>(
    null
  );

  useEffect(() => {
    setCurrentAnnotation(null);
  }, [videoSource]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );

  return (
    <div className="appContainer" data-testid="app-container">
      <div className="contentContainer">
        <div className="headerAndMainContainer">
          <div className="header">
            <Header annotationData={annotationData} />
          </div>
          <MainPane
            setAnnotationData={setAnnotationData}
            setCurrentAnnotation={setCurrentAnnotation}
            videoSource={videoSource}
            dataSource={dataSource}
          />
        </div>
        <Sidebar
          currentAnnotation={currentAnnotation}
          setVideoSource={setVideoSource}
          setDataSource={setDataSource}
        />
      </div>
    </div>
  );
};

export default App;
