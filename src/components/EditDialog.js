import React, { useContext, useCallback, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhoneInput from "mui-phone-input";
import { _editContact } from "../utils/_DATA";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 800,
    margin: theme.spacing(1),
    justifyContent: "center",
    padding: 30,
  },

  dialogContent: {
    padding: 30,
  },

  field: {
    margin: 20,
  },

  buttonOrange: {
    backgroundColor: "#f37121",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
    margin: 10,
  },
  buttonRed: {
    backgroundColor: "#c70039",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
    margin: 10,
  },
}));

export default function EditDialog(props) {
  const classes = useStyles();

  const { onClose, open, contactId } = props;
  const handleClose = () => {
    onClose();
  };

  const { contacts, editContact } = useContext(GlobalContext);
  const contact = Object.values(contacts).find(
    (contact) => contactId === contact.id
  );
  const [firstname, setFirstName] = React.useState(`${contact.firstname}`);
  const [lastname, setLastName] = React.useState(`${contact.lastname}`);
  const [mobile, setMobile] = React.useState(`${contact.numbers.mobile}`);
  const [home, setHome] = React.useState(`${contact.numbers.home}`);
  const [work, setWork] = React.useState(`${contact.numbers.work}`);

  const updateContact = useCallback(
    (contact) => {
      contact &&
        _editContact(contact)
          .then((res) => editContact(res))
          .then(onClose());
    },
    [editContact, onClose]
  );

  useEffect(() => {
    updateContact();
  }, [updateContact]);

  const handleEdit = (e) => {
    e.preventDefault();

    updateContact({
      id: contact.id,
      firstname,
      lastname,
      numbers: {
        mobile,
        home,
        work,
      },
      createdDate: contact.createdDate,
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <form autoComplete="off">
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

              <Grid container item xs={6}>
                <Grid item className={classes.field}>
                  <PhoneInput
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
            </Grid>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} className={classes.buttonOrange}>
            Cancel
          </Button>
          <Button onClick={handleEdit} className={classes.buttonRed}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
