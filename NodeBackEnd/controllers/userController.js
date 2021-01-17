'use strict';

const firebase = require('../firebase_db');
const firestore = firebase.firestore();
const users = firestore.collection('users');
const tracingpingData = firestore.collection('tracingpingData')


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
const updateCovidStatus = async (uid, covid) => {
  const data = {
    name: name,
    uid: uid, 
    covid: covid,
  };
  //find the entry where the uid and set the covid value to that
  const query = users.where("uid", "==", uid.toString())
  const updatedUser = await users.doc(data.uid.toString()).update(data);
};

/* Add new user. */
const addLangLong = async (latitude, longitude, uid) => {
    try {
        //find way to add latitude and longitude
      const addedUser = await users.doc(data.uid.toString()).set(data);
    }
    catch(error){
      console.log(error);
    }
  };

/* Remove fields from data table. Automatic after X time. */
// const cleanDataTable;

// /* Update data table */
// const updateDataTable;

// /* Update UID close contacts. */
// const updateCloseContacts;

/* remove fields from data table */

/* remove fields from data table */

/* remove fields from data table */







module.exports = {
    addUser, updateCovidStatus
}