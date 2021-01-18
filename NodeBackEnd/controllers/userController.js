'use strict';
const firebase = require('firebase'); 
const firebasedb = require('../firebase_db');
const firestore1 = firebasedb.firestore();
const users = firestore1.collection('users');
const dataTable = firestore1.collection('data');
const tracingpingData = firestore1.collection('tracingpingData')
const { calculateGeolocationData } = require('../geolocation/geolocationConversion')
const { notifyCovid } = require('../twilioMessaging/twillioFunctions')


/* Add new user. DONEE*/
const addUser = async (name, covid, phone, id) => {
  // let id = await users.doc().id
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
  if(covid){
    //query for all the people in the contact list and message them
    const info = await users.doc(uid.toString()).get();
    const contacts = info.data().contact;
    for (let each of contacts) {
      const person = await users.doc(each).get();
      await notifyCovid(person.data().phone, 1);
    }
  }
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
    const temp = await dataTable.add(data);
    checkSimilarSurroudings(uid, lat, long, '1');

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

const print = (one, two) => {
  console.log(one + ": ", two);
}

/* Goes through the data table and */
const checkSimilarSurroudings = async (uid, lat, long, time) => {
  // let time2 = new firebase.firestore.FieldValue.serverTimestamp().toDate()
  // console.log("time: ", time2);
  let geopointsConfig = calculateGeolocationData(lat, long)
  try{
    const snapshot = await dataTable.get();
    const people = snapshot.docs.map(doc => doc.data()).filter(function(each) {
      return each.latitude >= geopointsConfig.minLatitude && each.latitude <= geopointsConfig.maxLatitude
          && each.longitude >= geopointsConfig.minLongitude && each.longitude <= geopointsConfig.maxLongitude
    });
    // console.log(people)
    var filtered = people.filter(function(item) {
      return item.uid !== uid;})    
    // console.log("THIS IS FLTERES", filtered)
    let reducedPeople = new Set()
    filtered.forEach(element => reducedPeople.add(element.uid))  
    console.log("THIS IS REDUCED", reducedPeople)
    for(let user of reducedPeople){
      await addCloseContacts(uid, user)
    }
  }
  catch(err){
    console.log(err)
  }
}

/* Adds UID2 and UID1 close contacts. */
const addCloseContacts = async (uid1, uid2) => {
  try {
    print('uid1', uid1)
    print('uid2', uid2)
    const person1 = await users.doc(uid1.toString()).get();
    const person1Data = person1.data();

    print("person1data", person1Data)
    const person2 = await users.doc(uid2.toString()).get();
    const person2Data = person2.data();
    print("person2data", person2Data)
    person1Data.contact.push(uid2);
    person2Data.contact.push(uid1);

    const contact1 = await users.doc(uid1).update({contact: person1Data.contact});
    const contact2 = await users.doc(uid2).update({contact: person2Data.contact});
    print("contact1", person1Data.contact);
    print("contact2", person2Data.contact);
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