import React from "react";
import { AppBar, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, padding: [1, 1, 1] }}
      >
        Reach Industries Frontend Assessment
      </Typography>
    </AppBar>
  );
};

export default Header;
