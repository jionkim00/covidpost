'use strict'

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
} = process.env;


module.exports = {
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
    },
    twilioConfig: {
        twilioSid: TWILIO_ACCOUNT_SID,
        twilioToken: TWILIO_AUTH_TOKEN
    }
}