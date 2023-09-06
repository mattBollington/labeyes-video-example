import React from "react";
import styles from "./MainPane.module.css";

interface MainPaneProps {
  videoSrc: string;
}

const MainPane: React.FC<MainPaneProps> = ({ videoSrc }) => {
  return (
    <div className={styles.mainPane}>
      <video className={styles.video} controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MainPane;
