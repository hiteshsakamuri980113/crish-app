import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    color: "white",
    padding: theme.spacing(2),
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  icon: {
    verticalAlign: "middle",
    color: "white", // Ensure the icon is white
  },
  textWithIcon: {
    // display: "inline-flex",
    alignItems: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" color="inherit">
        made with{" "}
        <span className={classes.textWithIcon}>
          <FavoriteIcon className={classes.icon} />
        </span>{" "}
        for Indian cricket.
      </Typography>
    </div>
  );
};

export default Footer;
