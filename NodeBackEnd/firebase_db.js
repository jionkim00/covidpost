const firebase = require('firebase');
const config = require('./config.js')

const firebasedb = firebase.initializeApp(config.firebaseConfig);

module.exports = firebasedb;