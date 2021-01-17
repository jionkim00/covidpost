'use strict';
const firebase = require('firebase'); 
const firebasedb = require('../firebase_db');
const firestore1 = firebasedb.firestore();
const users = firestore1.collection('users');
const dataTable = firestore1.collection('data');
const tracingpingData = firestore1.collection('tracingpingData')
const { calculateGeolocationData } = require('../geolocation/geolocationConversion')


/* Add new user. DONEE*/
const addUser = async (name, covid, phone) => {
  let id = await users.doc().id
  try {
    const data = {
      name: name,
      uid: id, 
      covid: covid,
      phone: phone,
      contact: []
    };
    const addedUser = await users.doc(id.toString()).set(data);
  }
  catch(error){
    console.log(error);
  }
  return id;
};

/* Update Covid. DONEE*/
const updateCovidStatus = async (uid, covid) => {
  const updatedUser = await users.doc(uid).update({covid: covid});
};

/* Remove fields from data table. Automatic after X time. */
const cleanDataTable = async () => {
  // filter by date and remove each one
};

/* Update data table. DONE*/
const updateDataTable = async (uid, lat, long) => {
  try{
    const data = {
      uid: uid,
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
      date: new firebase.firestore.FieldValue.serverTimestamp()
    };
    const temp = await dataTable.doc(uid.toString()).set(data);
  }
  catch(err){
    console.log(err)
  }

};

const getPhoneNumbersforCovid = async (uids) => {
  let texts = []
  for(uid of uids){
    texts = await dataTable.where(uid)
  }
  texts.forEach(user => {
    console.log(user.phoneNumber)
    //ca;; 
  })
}

/* Goes through the data table and */
const checkSimilarSurroudings = async (uid, lat, long, time) => {
  // let time2 = new firebase.firestore.FieldValue.serverTimestamp().toDate()
  // console.log("time: ", time2);
  let geopointsConfig = calculateGeolocationData(lat, long)
  try{
    const snapshot = await dataTable.get();
    const stuff = snapshot.docs.map(doc => doc.data()).filter(function(each) {
      return each.latitude >= geopointsConfig.minLatitude && each.latitude <= geopointsConfig.maxLatitude
          && each.longitude >= geopointsConfig.minLongitude && each.longitude <= geopointsConfig.maxLongitude
    });
    // console.log(stuff);                         
  }
  catch(err){
    console.log(err)
  }
}

/* Adds UID2 and UID1 close contacts. */
const addCloseContacts = async (uid1, uid2) => {
  try {
    const person1 = await users.doc(uid1).get();
    const person1Data = person1.data();

    const person2 = await users.doc(uid2).get();
    const person2Data = person2.data();

    // how to get times
    const data1 = {
      uid: person1Data.uid,
      covid: person1Data.covid,
    };
    
    const data2 = {
      uid: person2Data.uid,
      covid: person2Data.covid,
    };

    // const person1 = await users.doc(uid1).get();
    person1.data().contact.push(data2);
    person2.data().contact.push(data1);

    const contact1 = await users.doc(uid1).update({contact: person1.data().contact});
    const contact2 = await users.doc(uid1).update({contact: person2.data().contact});

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
    addUser, 
    updateCovidStatus, 
    updateDataTable, 
    checkCloseContacts, 
    addCloseContacts, 
    checkSimilarSurroudings,
    getPhoneNumbersforCovid
}