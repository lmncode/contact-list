import React, { useContext, useEffect, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import AddContact from "./components/AddContact";
import Navbar from "./components/Navbar";
import NotFoundPage from "./components/NotFoundPage";
import { _getContacts } from "./utils/_DATA";
import { GlobalContext } from "./context/GlobalState";

function App() {
  //get initial data
  const { receiveContacts } = useContext(GlobalContext);
  const getContacts = () => {
    _getContacts().then((res) => receiveContacts(res));
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Grid container direction="row" justify="center" alignItems="center">
          <Switch>
            <Route path="/" component={ContactList} exact />
            <Route path="/contact/:id" component={ContactDetails} exact />
            <Route path="/add" component={AddContact} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </Grid>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
