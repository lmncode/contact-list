import React, { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";
export const RECEIVE_CONTACTS = "RECEIVE_CONTACTS";
export const REMOVE_CONTACT = "REMOVE_CONTACT";
export const ADD_CONTACT = "ADD_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";

const initialState = {
  contacts: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function receiveContacts(contacts) {
    dispatch({
      type: RECEIVE_CONTACTS,
      contacts,
    });
  }

  function removeContact(id) {
    dispatch({
      type: REMOVE_CONTACT,
      id,
    });
  }

  function addContact(contact) {
    dispatch({
      type: ADD_CONTACT,
      contact,
    });
  }

  function editContact(updatedContact) {
    dispatch({
      type: EDIT_CONTACT,
      updatedContact,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        removeContact,
        addContact,
        editContact,
        receiveContacts,
        contacts: state.contacts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
