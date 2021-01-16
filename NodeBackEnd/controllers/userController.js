'use strict';

const firebase = require('../firebase_db');
const firestore = firebase.firestore();
const users = firestore.collection('users');


/* Add new user. */
const addUser = async (name, uid, covid) => {
  try {
    const data = {
      name: name,
      uid: uid, 
      covid: covid,
    };
    const addedUser = await users.doc(data.uid.toString()).set(data);
  }
  catch(error){
    console.log(error);
  }
};

/* Update Covid. */
const updateCovid = async (name, uid, covid) => {
  const data = {
    name: name,
    uid: uid, 
    covid: covid,
  };
  const updatedUser = await users.doc(data.uid.toString()).update(data);
};

/* Remove fields from data table. Automatic after X time. */
const cleanDataTable;

/* Update data table */
const updateDataTable;

/* Update UID close contacts. */
const updateCloseContacts;

/* remove fields from data table */

/* remove fields from data table */

/* remove fields from data table */







module.exports = {
    addUser, updateCovid
}