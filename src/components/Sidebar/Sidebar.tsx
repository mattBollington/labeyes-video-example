import React from "react";
import styles from "./Sidebar.module.css";

const videos = ["Labeyes video 1", "Labeyes video 2", "Labeyes video 3"];

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar} data-testid="sidebar">
      <ul className={styles.videoList}>
        {videos.map((video, index) => (
          <li key={index} className={styles.videoItem}>
            {video}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
