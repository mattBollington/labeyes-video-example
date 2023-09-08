import { useState, useEffect } from "react";
import axios from "../utils/api";
import { Annotation } from "../types/types";

const useFetchData = (videoSource: string, dataSource: string) => {
  const [videoData, setVideoData] = useState<Blob | null>(null);
  const [annotationData, setAnnotationData] = useState<Annotation[] | null>(
    null
  );

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setVideoData(null);
    setAnnotationData(null);
    setError(null);
    const fetchVideoAndAnnotations = async () => {
      setLoading(true);
      try {
        const videoResponse =
          videoSource &&
          (await axios.get(videoSource, {
            responseType: "blob",
          }));

        if (videoResponse) {
          setVideoData(videoResponse.data);
        }

        const annotationResponse = await axios.get(dataSource);

        setAnnotationData(annotationResponse.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unable to fetch video data."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideoAndAnnotations();
  }, [videoSource, dataSource]);

  return { videoData, annotationData, error, loading };
};

export default useFetchData;
