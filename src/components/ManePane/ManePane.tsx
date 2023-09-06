import styles from "./MainPane.module.css";

interface MainPaneProps {
  videoSrc: string;
}

const MainPane: React.FC<MainPaneProps> = ({ videoSrc }) => {
  return (
    <div className={styles.mainPane} data-testid="mainPane">
      <video data-testid="video-element" className={styles.video} controls>
        <source data-testid="video-source" src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MainPane;
