import { useState } from "react";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import styles from "./ShowHideJson.module.css";
import { ShowHideJsonProps } from "../../types/types";

const ShowHideJson: React.FC<ShowHideJsonProps> = ({ data }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleDownload = () => {
    const fileData = JSON.stringify(data, null, 2);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "annotation.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        aria-label="vertical contained button group"
        sx={{ "& .MuiButton-root": { my: 0.1 } }}
      >
        <Button
          variant="contained"
          onClick={toggleVisibility}
          className={styles.button}
        >
          {visible ? "Hide Data" : "Show Data"}
        </Button>
        <Button
          variant="contained"
          className={styles.downloadButton}
          onClick={handleDownload}
        >
          Download Data
        </Button>
      </ButtonGroup>
      {visible && (
        <div className={styles.jsonContainer}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ShowHideJson;
