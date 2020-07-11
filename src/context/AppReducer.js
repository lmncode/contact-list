import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  EDIT_CONTACT,
  RECEIVE_CONTACTS,
} from "./GlobalState";

export default (state, action) => {
  switch (action.type) {
    case RECEIVE_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...Object.values(state.contacts), action.contact],
      };

    case EDIT_CONTACT:
      const updatedContacts = Object.values(state.contacts).map((contact) => {
        if (contact.id === action.updatedContact.id) {
          return action.updatedContact;
        }
        return contact;
      });

      return { ...state, contacts: updatedContacts };

    case REMOVE_CONTACT:
      const filteredContacts = Object.values(state.contacts).filter(
        (contact) => contact.id !== action.id
      );
      return {
        ...state,
        contacts: filteredContacts,
      };

    default:
      return state;
  }
};
