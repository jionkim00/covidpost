'use strict';

const firebase = require('../firebase_db');
const firestore = firebase.firestore();
const users = firestore.collection('users');


/* add new user */
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
}

/* update Covid */
const updateCovid = async (name, uid, covid) => {
  const data = {
    name: name,
    uid: uid, 
    covid: covid,
  };
  const updatedUser = await users.doc(data.uid.toString()).update(data);
}

/* remove fields from data table */

/* remove fields from data table */

/* remove fields from data table */

/* remove fields from data table */

/* remove fields from data table */

/* remove fields from data table */

module.exports = {
    addUser, updateCovid
}