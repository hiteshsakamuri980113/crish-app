import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    display: "flex",
    alignItems: "center",
    height: "60px", // Adjust the height of the header
    padding: "0 20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "left", // Align the title to the left
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        CRisH
      </Typography>
    </div>
  );
};

export default Header;
