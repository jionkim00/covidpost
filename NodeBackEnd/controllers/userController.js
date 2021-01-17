'use strict';

const firebaseAdmin = require('firebase-admin');

const firebase = require('../firebase_db');
const firestore = firebase.firestore();
const users = firestore.collection('users');
const dataTable = firestore.collection('data');
const tracingpingData = firestore.collection('tracingpingData')


/* Add new user. */
const addUser = async (name, uid, covid) => {
  try {
    const data = {
      name: name,
      uid: uid, 
      covid: covid,
      contact: []
    };
    const addedUser = await users.doc(data.uid.toString()).add(data);
  }
  catch(error){
    console.log(error);
  }
};

/* Update Covid. */
const updateCovidStatus = async (name, uid, covid) => {
  const updatedUser = await users.doc(data.uid).update({covid: covid});
};

/* Add lat/long. */
// whats the point of this
const addLangLong = async (latitude, longitude, uid) => {
    try {
        //find way to add latitude and longitude
      const addedUser = await users.doc(uid).set(data);
    }
    catch(error){
      console.log(error);
    }
  };

/* Remove fields from data table. Automatic after X time. */
const cleanDataTable = async () => {
  // filter by date and remove each one
};

/* Update data table. */
// pass in time or current time?
const updateDataTable = async (name, uid, lat, long, time) => {
  const data = {
    name: name,
    uid: uid,
    geopoints: new firebaseAdmin.firestore.GeoPoint(lat, long), 
  };
  const temp = await dataTable.doc(uid.toString()).set(data);
};

/* Adds UID2 to UID1 close contact. */
const addCloseContacts = async (uid1, uid2) => {
  try {
    
    const person2 = await users.doc(uid2).get();
    const person2Data = person2.data();

    // how to get times
    const data = {
      name: person2Data.name,
      uid: person2Data.uid,
      covid: person2Data.covid,
    };

    const person1 = await users.doc(uid1).get();
    person1.data().contact.push(data);

    const contacts = await users.doc(uid1).update({contact: person1.data().contact});

  }
  catch(error) {
    console.log(error);
  }
}

/* Update close contacts. */
// const updateCloseContacts;

/* Checks close contact if someone with covid. */
const checkCloseContacts = async (uid) => {
  let contacts = await users.doc(uid).get();

  let potentialCovid = contacts.data().contact.filter(function(each) {
    return each.covid == true;
  });

  return potentialCovid.length > 0 ? true : false;
};

module.exports = {
    addUser, updateCovidStatus, updateDataTable, checkCloseContacts, addCloseContacts
}