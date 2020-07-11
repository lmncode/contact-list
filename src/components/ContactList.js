import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Paper,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    padding: 10,
  },
  listItem: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    border: 3,
    borderColor: "#f37121",
    maxWidth: 480,
    margin: 10,
    borderRadius: 5,
  },
  avatar: {
    backgroundColor: "#c70039",
  },
  button: {
    backgroundColor: "#f37121",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
  },
  text: {
    margin: 0,
  },
}));

const ContactList = () => {
  const classes = useStyles();
  const { contacts } = useContext(GlobalContext);
  if (Object.values(contacts).length)
    return (
      <Paper className={classes.root} elevation={5}>
        <List>
          {Object.values(contacts).map((contact) => (
            <ListItem className={classes.listItem} key={contact.id}>
              <Grid container justify="space-between">
                <Grid item container xs={6}>
                  <Grid item>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        {contact.firstname.substring(0, 1).toLocaleUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                  </Grid>
                  <Grid item>
                    <ListItemText
                      className={classes.text}
                      primary={`${contact.firstname} ${contact.lastname}`}
                      secondary={contact.numbers.mobile}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText>
                    <Link to={`/contact/${contact.id}`}>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        View Contact
                      </Button>
                    </Link>
                  </ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  else
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
};
export default ContactList;
