import { Annotation } from "../types/types";

export function calculateFrameRate(video: HTMLVideoElement | null, annotationData: Annotation[] | null, callback: (frameRate: number) => void): void {
    if (!video || !annotationData) return;
  
    video.onloadedmetadata = () => {
      const durationInSeconds = video.duration;
      const numberOfFrames = annotationData.length;
      const frameRate = numberOfFrames / durationInSeconds;
      callback(frameRate);
    };
  }
  