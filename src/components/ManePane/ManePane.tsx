import React, { useState } from "react";
import styles from "./MainPane.module.css";
import useFetchData from "../../services/fetchData";
import VideoCanvas from "../VideoCanvas/VideoCanvas";

const MainPane: React.FC = () => {
  const [frameRate, setFrameRate] = useState<number | null>(null);
  const { videoData, annotationData, error, loading } = useFetchData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className={styles.mainPane} data-testid="mainPane">
      {videoData && annotationData && (
        <VideoCanvas
          videoData={videoData}
          annotationData={annotationData}
          frameRate={frameRate}
          setFrameRate={setFrameRate}
        />
      )}
    </div>
  );
};

export default MainPane;
