import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

import { _removeContact } from "../utils/_DATA";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    padding: 50,
  },
  avatar: {
    backgroundColor: "#c70039",
  },
  buttonOrange: {
    backgroundColor: "#f37121",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
    margin: 10,
  },
  buttonRed: {
    backgroundColor: "#c70039",
    "&:hover": {
      backgroundColor: "#ffbd69",
    },
    margin: 10,
  },
  icon: {
    color: "#111d5e",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function ContactDetails(route) {
  const classes = useStyles();

  //control dialogs
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenDelete = (e) => {
    e.preventDefault();
    setOpenDelete(true);
  };
  const handleCloseDelete = (value) => {
    setOpenDelete(false);
  };
  const handleClickOpenEdit = (e) => {
    e.preventDefault();
    setOpenEdit(true);
  };
  const handleCloseEdit = (value) => {
    setOpenEdit(false);
  };

  //delete contact
  let history = useHistory();
  const { contacts, removeContact } = useContext(GlobalContext);
  const contactId = route.match.params.id;
  const contact = Object.values(contacts).find(
    (contact) => contactId === contact.id
  );
  const deleteContact = (id) => {
    _removeContact(id).then(removeContact(id));
  };
  useEffect(() => {
    deleteContact();
  }, []);
  const handleDelete = (e) => {
    e.preventDefault();
    deleteContact(contactId);
    history.push("/");
  };

  if (contact)
    return (
      <Card className={classes.root} elevation={5}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {contact.firstname.substring(0, 1).toLocaleUpperCase()}
            </Avatar>
          }
          title={`${contact.firstname} ${contact.lastname}`}
        />
        <Divider />
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <PhoneIcon className={classes.icon} />
            </Grid>
            <Grid item>
              <Typography variant="button" color="textSecondary" component="p">
                {`${contact.numbers.mobile}`}
              </Typography>
            </Grid>
          </Grid>

          {contact.numbers.home && (
            <Grid container justify="space-between">
              <Grid item>
                <HomeIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <Typography
                  variant="button"
                  color="textSecondary"
                  component="p"
                >
                  {`${contact.numbers.home}`}
                </Typography>
              </Grid>
            </Grid>
          )}

          {contact.numbers.work && (
            <Grid container justify="space-between">
              <Grid item>
                <WorkIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <Typography
                  variant="button"
                  color="textSecondary"
                  component="p"
                >
                  {`${contact.numbers.work}`}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Created date: {contact.createdDate}
          </Typography>
          {contact.lastModifiedDate && (
            <Typography variant="subtitle1" gutterBottom>
              Last modified date: {contact.lastModifiedDate}
            </Typography>
          )}
        </CardContent>
        <Divider />
        <CardContent>
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonOrange}
            startIcon={<EditIcon />}
            onClick={handleClickOpenEdit}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonRed}
            startIcon={<DeleteIcon />}
            onClick={handleClickOpenDelete}
          >
            Delete
          </Button>
        </CardContent>
        <DeleteDialog
          open={openDelete}
          onClose={handleCloseDelete}
          handleDelete={handleDelete}
        />

        <EditDialog
          open={openEdit}
          onClose={handleCloseEdit}
          contactId={contactId}
        />
      </Card>
    );
  else
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
}
