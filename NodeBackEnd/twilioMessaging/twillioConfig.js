'use strict'
const config = require('../config.js')
const twilioMessaging = require('twilio')(config.twilioConfig.twilioSid, config.twilioConfig.twilioToken);

module.exports = twilioMessaging;
