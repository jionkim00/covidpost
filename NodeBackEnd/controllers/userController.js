'use strict';

const firebase = require('../firebase_db');
const firestore = firebase.firestore();

const userTable = firestore.collection('users');
const dataTable = firestore.collection('data');

/* Add new user. */
const addUser = async (name, uid, covid) => {
  try {
    const data = {
      name: name,
      uid: uid, 
      covid: covid,
    };
    const addedUser = await userTable.doc(data.uid.toString()).set(data);
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
  const updatedUser = await userTable.doc(data.uid.toString()).update(data);
};

/* Remove fields from data table. Automatic after X time. */
const cleanDataTable;

/* Update data table. */
const updateDataTable = async (name, uid, long, lat, time) => {
  const data = {
    name: name,
    uid: uid,
    long: long, 
    lat: lat,
    time: time,
  };
  const temp = await dataTable.doc(data.uid.toString()).update(data);
};

/* Update close contacts. */
const updateCloseContacts;

/* Checks close contact if someone with covid. */
const checkCloseContacts = async (uid) => {
  let contacts = await userTable.doc(uid).get();
};

module.exports = {
    addUser, updateCovid, updateDataTable
}