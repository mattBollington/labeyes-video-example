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
            margin: { md: "5px" },
            display: { xs: "block", md: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: { xs: "16px", md: "0px" },
            py: { xs: 0, md: 1 },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              padding: [1, 1, 0],
              // fontSize: { xs: "1rem", md: "1.25rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textAlign: { xs: "center", md: "left" },
              marginLeft: { xs: "16px", md: "32px" },
            }}
          >
            Reach Industries Frontend Assessment
          </Typography>

          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-end" },
              flexWrap: "nowrap",
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleDownload}
              sx={{ mx: 1, whiteSpace: "nowrap" }}
            >
              Download Data
            </Button>
            <div className={styles.container}>
              <Button
                className={styles.container}
                variant="outlined"
                size="small"
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
