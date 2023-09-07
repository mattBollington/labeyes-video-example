import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./MainPane.module.css";
import useFetchData from "../../services/fetchData";
import { drawBoundingBoxes } from "../../utils/drawBoundingBoxes";
import { Annotation } from "../../types/types";
import { calculateFrameRate } from "../../utils/calculateFrameRate";

const MainPane: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );
  const [frameRate, setFrameRate] = useState<number | null>(null);
  const { videoData, annotationData, error, loading } = useFetchData();

  useEffect(() => {
    const video = videoRef.current;
    calculateFrameRate(video, annotationData, setFrameRate);
  }, [videoData, annotationData]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !annotationData || !frameRate) return;

    const currentFrame = Math.floor(video.currentTime * frameRate);
    const currentAnno = annotationData[currentFrame];
    const ctx = canvas.getContext("2d");
    if (ctx && currentAnno) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBoundingBoxes(
        ctx,
        currentAnno,
        video.videoWidth,
        video.videoHeight,
        canvas.width,
        canvas.height
      );
      setCurrentAnnotation(currentAnno);
    }
  }, [annotationData, frameRate]);

  const handleResize = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const rect = video.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      handleTimeUpdate();
    }
  }, [handleTimeUpdate]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [handleTimeUpdate]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;
  if (!videoData || !annotationData) return null;

  return (
    <div className={styles.mainPane} data-testid="mainPane">
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          data-testid="video-element"
          className={styles.video}
          controls
        >
          <source
            data-testid="video-source"
            src={URL.createObjectURL(videoData)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <canvas ref={canvasRef} className={styles.canvasOverlay}></canvas>
      </div>
      <div>Current Annotation: {JSON.stringify(currentAnnotation)}</div>
    </div>
  );
};

export default MainPane;
