import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonOrange: {
    backgroundColor: "#f37121",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
    margin: 10,
  },
  buttonRed: {
    backgroundColor: "#c70039",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
    margin: 10,
  },
}));

export default function DeleteDialog(props) {
  const classes = useStyles();
  const { onClose, open, handleDelete } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.buttonOrange}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            className={classes.buttonRed}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
