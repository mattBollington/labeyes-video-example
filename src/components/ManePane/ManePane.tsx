import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { scaleLinear } from "d3-scale";
import styles from "./MainPane.module.css";

interface MainPaneProps {
  videoSrc: string;
}

type Annotation = number[][];

const ANNOTATION_API =
  "https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.json";

const loadAnnotations = async (): Promise<Annotation[]> => {
  try {
    const response = await axios.get(ANNOTATION_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching annotations", error);
    return [];
  }
};

const MainPane: React.FC<MainPaneProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );

  useEffect(() => {
    loadAnnotations().then(setAnnotations);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const handleResize = () => {
      if (video && canvas) {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [videoRef, canvasRef]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const handleTimeUpdate = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      const currentFrame = Math.floor(video.currentTime * 30);
      const currentAnno = annotations[currentFrame];
      const ctx = canvas.getContext("2d");
      console.log(annotations.length);
      if (ctx && currentAnno) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scaleX = scaleLinear()
          .domain([0, video.videoWidth])
          .range([0, video.clientWidth]);

        const scaleY = scaleLinear()
          .domain([0, video.videoHeight])
          .range([0, video.clientHeight]);

        for (let bbox of currentAnno) {
          let [x, y, width, height] = bbox;

          const overlayX = scaleX(x);
          const overlayY = scaleY(y);
          const overlayWidth = scaleX(width) - scaleX(0);
          const overlayHeight = scaleY(height) - scaleY(0);

          ctx.lineWidth = 2;
          ctx.strokeStyle = "black";
          ctx.strokeRect(overlayX, overlayY, overlayWidth, overlayHeight);
        }

        setCurrentAnnotation(currentAnno);
      }
    };

    if (video && canvas) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoRef, canvasRef, annotations]);

  return (
    <div className={styles.mainPane} data-testid="mainPane">
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          data-testid="video-element"
          className={styles.video}
          controls
        >
          <source data-testid="video-source" src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <canvas ref={canvasRef} className={styles.canvasOverlay}></canvas>
      </div>
      <div>Current Annotation: {JSON.stringify(currentAnnotation)}</div>
    </div>
  );
};

export default MainPane;
