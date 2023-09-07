import { useState, useEffect } from "react";
import axios from "../utils/api";
import { Annotation } from "../types/types";

const useFetchData = () => {
  const [videoData, setVideoData] = useState<Blob | null>(null);
  const [annotationData, setAnnotationData] = useState<Annotation[] | null>(
    null
  );

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideoAndAnnotations = async () => {
      setLoading(true);
      try {
        const videoResponse = await axios.get(
          "/FrontendCandidateTest-FINAL.mp4",
          {
            responseType: "blob",
          }
        );

        const annotationResponse = await axios.get(
          "/FrontendCandidateTest-FINAL.json"
        );

        setVideoData(videoResponse.data);
        setAnnotationData(annotationResponse.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideoAndAnnotations();
  }, []);

  return { videoData, annotationData, error, loading };
};

export default useFetchData;
