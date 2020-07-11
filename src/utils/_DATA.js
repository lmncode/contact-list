let contacts = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    firstname: "Sarah",
    lastname: "Edo",
    email: "aaa@gmail.com",
    numbers: {
      home: "123-541-9879",
      mobile: "123-541-9879",
      work: "123-541-9879",
    },
    createdDate: "8/11/2019",
    lastModifiedDate: "6/10/2020",
  },

  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    firstname: "Tyler",
    lastname: "McGinnis",
    email: "aaa@gmail.com",
    numbers: {
      home: "123-541-9879",
      mobile: "123-541-9879",
      work: "123-541-9879",
    },
    createdDate: "7/10/2020",
    lastModifiedDate: "",
  },

  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    firstname: "John",
    lastname: "Doe",
    email: "aaa@gmail.com",
    numbers: {
      home: "123-541-9879",
      mobile: "123-541-9879",
      work: "123-541-9879",
    },
    createdDate: "17/4/2020",
    lastModifiedDate: "",
  },
};

function generateID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function getCurrentDate() {
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

export function _getContacts() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...contacts }), 1000);
  });
}

export function _addContact(contact) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const updatedContact = {
        id: generateID(),
        ...contact,
        createdDate: getCurrentDate(),
        lastModifiedDate: "",
      };

      contacts = {
        ...contacts,
        [updatedContact.id]: updatedContact,
      };

      res(updatedContact);
    }, 1000);
  });
}

export function _editContact(contact) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const updatedContact = {
        id: contact.id,
        firstname: contact.firstname,
        lastname: contact.lastname,
        numbers: {
          mobile: contact.numbers.mobile,
          home: contact.numbers.home,
          work: contact.numbers.work,
        },
        createdDate: contact.createdDate,
        lastModifiedDate: getCurrentDate(),
      };
      contacts = {
        ...contacts,
        [contact.id]: {
          updatedContact,
        },
      };
      res(updatedContact);
    }, 1000);
  });
}

export function _removeContact(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      contacts = Object.values(contacts).filter((contact) => contact.id !== id);

      res({ ...contacts });
    }, 1000);
  });
}
