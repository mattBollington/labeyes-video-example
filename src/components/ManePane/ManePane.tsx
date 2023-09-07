import { useState } from "react";
import useFetchData from "../../services/fetchData";
import VideoCanvas from "../VideoCanvas/VideoCanvas";
import { MainPaneProps } from "../../types/types";

const MainPane: React.FC<MainPaneProps> = ({ setCurrentAnnotation }) => {
  const [frameRate, setFrameRate] = useState<number | null>(null);
  const { videoData, annotationData, error, loading } = useFetchData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="mainPane" data-testid="mainPane">
      {videoData && annotationData && (
        <VideoCanvas
          setCurrentAnnotation={setCurrentAnnotation}
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
