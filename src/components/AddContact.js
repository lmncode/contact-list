import React, { useContext, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import PhoneInput from "mui-phone-input";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Paper } from "@material-ui/core/";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { GlobalContext } from "../context/GlobalState";
import { _addContact } from "../utils/_DATA";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 600,
    margin: theme.spacing(1),
    justifyContent: "center",
    padding: 30,
  },

  label: {
    color: "green",
    marginBottom: 30,
  },

  numbers: {
    marginTop: 70,
  },
  field: {
    margin: 10,
  },

  buttonOrange: {
    backgroundColor: "#f37121",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
    margin: 30,
  },
}));

export default function AddContact() {
  const classes = useStyles();
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [home, setHome] = React.useState("");
  const [work, setWork] = React.useState("");
  const { addContact } = useContext(GlobalContext);

  let history = useHistory();

  const createContact = useCallback(
    (contact) => {
      contact &&
        _addContact(contact)
          .then((res) => addContact(res))
          .then(history.push("/"));
    },
    [addContact, history]
  );

  useEffect(() => {
    createContact();
  }, [createContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact({
      firstname,
      lastname,
      numbers: {
        mobile,
        home,
        work,
      },
    });
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Grid container item justify="center" xs={6}>
            <Grid item className={classes.field}>
              <TextField
                id="standard-basic"
                label="First name"
                required
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item className={classes.field}>
              <TextField
                id="standard-basic"
                label="Last name"
                required
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container justify="center" item xs={6}>
            <Grid item className={classes.field}>
              <PhoneInput
                required
                label="Mobile"
                value={mobile}
                onChange={setMobile}
              />
            </Grid>
            <Grid item className={classes.field}>
              <PhoneInput label="Home" value={home} onChange={setHome} />
            </Grid>
            <Grid item className={classes.field}>
              <PhoneInput label="Work" value={work} onChange={setWork} />
            </Grid>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.buttonOrange}
              startIcon={<PersonAddIcon />}
            >
              Add Contact
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
