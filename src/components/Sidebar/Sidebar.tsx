import styles from "./Sidebar.module.css";
import { Button, List, ListItem } from "@mui/material";
import { SidebarProps } from "../../types/types";

const videos = [
  {
    label: "Labeyes video 1",
    src: "/FrontendCandidateTest-FINAL.mp4",
    data: "/FrontendCandidateTest-FINAL.json",
  },
  { label: "Labeyes video 2", src: "2", data: "" },
  { label: "Labeyes video 3", src: "3", data: "" },
];

const Sidebar: React.FC<SidebarProps> = ({
  currentAnnotation,
  setVideoSource,
  setDataSource,
}) => {
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
            <Button
              fullWidth
              variant="outlined"
              className={styles.videoItem}
              onClick={() => {
                setVideoSource(video.src);
                setDataSource(video.data);
              }}
            >
              {video.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </aside>
  );
};

export default Sidebar;
