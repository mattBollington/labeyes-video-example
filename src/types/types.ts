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
    setCurrentAnnotation: React.Dispatch<React.SetStateAction<Annotation | null>>;
  }

  export interface MainPaneProps {
    setCurrentAnnotation: React.Dispatch<React.SetStateAction<Annotation | null>>;
    setAnnotationData: React.Dispatch<React.SetStateAction<Annotation[] | null>>; // Add this line
    videoSource: string;
    dataSource: string;
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

  export interface SidebarProps {
    currentAnnotation: Annotation | null;
    setVideoSource: React.Dispatch<React.SetStateAction<string>>;
    setDataSource: React.Dispatch<React.SetStateAction<string>>;
  }
