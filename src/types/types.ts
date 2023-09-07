export type BoundingBox = [number, number, number, number];
export type Annotation = BoundingBox[];
export interface HeaderProps {
    title?: string;
  }
  
  export interface VideoCanvasProps {
    videoData: Blob | null;
    annotationData: Annotation[] | null;
    frameRate: number | null;
    setFrameRate: React.Dispatch<React.SetStateAction<number | null>>;
  }
  
  export interface FetchDataResponse {
    videoData: Blob | null;
    annotationData: Annotation[] | null;
    error: Error | null;
    loading: boolean;
  }
  
  export interface ShowHideJsonProps {
    data: any;
  }
