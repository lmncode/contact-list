import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import { Grid, AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 50,
  },
  grow: {
    flexGrow: 1,
  },
  buttonFontSize: {
    fontSize: "11px",
    color: "#a1a1a1",
  },
  navLink: {
    margin: 20,
    color: "white",
  },
  active: {
    color: "#f37121",
    border: 2,
    borderColor: "#f37121",
  },
  AppBar: {
    backgroundColor: "#111d5e",
    backgroundSize: "cover",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.AppBar}>
        <Grid container justify="center">
          <Toolbar>
            <NavLink
              to="/"
              exact
              className={classes.navLink}
              activeClassName={classes.active}
            >
              Contact List
            </NavLink>
            <NavLink
              to="/add"
              exact
              className={classes.navLink}
              activeClassName={classes.active}
            >
              Add Contact
            </NavLink>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
}
