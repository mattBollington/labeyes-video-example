import { useState, useEffect } from "react";
import useFetchData from "../../services/fetchData";
import VideoCanvas from "../VideoCanvas/VideoCanvas";
import { MainPaneProps } from "../../types/types";
import Alert from "@mui/material/Alert";

const MainPane: React.FC<MainPaneProps> = ({
  setAnnotationData,
  setCurrentAnnotation,
  videoSource,
  dataSource,
}) => {
  const [frameRate, setFrameRate] = useState<number | null>(null);
  const { videoData, annotationData, error, loading } = useFetchData(
    videoSource,
    dataSource
  );

  useEffect(() => {
    if (annotationData) {
      setAnnotationData(annotationData);
    }
  }, [annotationData, setAnnotationData]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <Alert severity="error">
        The video that you have selected is not available
      </Alert>
    );

  return (
    <div
      className="mainPane"
      style={{ paddingTop: "2px" }}
      data-testid="mainPane"
    >
      {videoData && annotationData && (
        <>
          <VideoCanvas
            setCurrentAnnotation={setCurrentAnnotation}
            videoData={videoData}
            annotationData={annotationData}
            frameRate={frameRate}
            setFrameRate={setFrameRate}
          />
        </>
      )}
    </div>
  );
};

export default MainPane;
