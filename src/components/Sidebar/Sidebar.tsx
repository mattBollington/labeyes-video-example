import styles from "./Sidebar.module.css";
import { Button, List, ListItem } from "@mui/material";
import { SidebarProps } from "../../types/types";

const videos = ["Labeyes video 1", "Labeyes video 2", "Labeyes video 3"];

const Sidebar: React.FC<SidebarProps> = ({ currentAnnotation }) => {
  return (
    <aside className={styles.sidebar} data-testid="sidebar">
      <div className={styles.currentAnnotation}>
        <h3 className="header">Current Annotation:</h3>
        {currentAnnotation &&
          currentAnnotation.map((box, index) => (
            <div key={index}>
              <strong>Box {index + 1}:</strong> [{box.join(", ")}]
            </div>
          ))}
      </div>
      <List component="nav" className={styles.videoList}>
        {videos.map((video, index) => (
          <ListItem key={index} disablePadding>
            <Button fullWidth variant="outlined" className={styles.videoItem}>
              {video}
            </Button>
          </ListItem>
        ))}
      </List>
    </aside>
  );
};

export default Sidebar;
