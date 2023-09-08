import React, { useState } from "react";
import { AppBar, Typography, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Annotation } from "../../types/types";
import styles from "./Header.module.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Header: React.FC<{ annotationData: Annotation[] | null }> = ({
  annotationData,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleDownload = () => {
    const fileData = JSON.stringify(annotationData, null, 2);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "annotation.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: [0, 2],
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              padding: [1, 1, 0],
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            Reach Industries Frontend Assessment
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexWrap: "nowrap",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleDownload}
              sx={{ mx: 1, whiteSpace: "nowrap" }}
            >
              Download Data
            </Button>
            <div className={styles.container}>
              <Button
                className={styles.container}
                variant="outlined"
                onClick={toggleVisibility}
                sx={{
                  mx: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {visible ? "Hide Data" : "View Data"}
              </Button>
              {visible && annotationData && (
                <div className={styles.jsonContainer}>
                  <pre>{JSON.stringify(annotationData, null, 2)}</pre>
                </div>
              )}
            </div>
          </Box>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
