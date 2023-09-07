import { useRef, useEffect, useCallback } from "react";
import { drawBoundingBoxes } from "../../utils/drawBoundingBoxes";
import { calculateFrameRate } from "../../utils/calculateFrameRate";
import styles from "./VideoCanvas.module.css";
import ShowHideJson from "../ShowHideJson/ShowHideJson";
import { VideoCanvasProps } from "../../types/types";

const VideoCanvas: React.FC<VideoCanvasProps> = ({
  setCurrentAnnotation,
  videoData,
  annotationData,
  frameRate,
  setFrameRate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    calculateFrameRate(video, annotationData, setFrameRate);
  }, [videoData, annotationData, setFrameRate]);

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
  }, [annotationData, frameRate, setCurrentAnnotation]);

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

  if (!videoData || !annotationData) return null;

  return (
    <>
      <div className={styles.videoContainer}>
        <ShowHideJson data={annotationData} />
        <video ref={videoRef} className={styles.video} controls>
          <source src={URL.createObjectURL(videoData)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <canvas ref={canvasRef} className={styles.canvasOverlay}></canvas>
      </div>
    </>
  );
};

export default VideoCanvas;
