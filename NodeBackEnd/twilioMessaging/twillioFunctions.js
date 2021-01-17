'use strict'

const twilioMessaging = require('./twillioConfig');

const notifyCovid = (phoneNumber, degree) => {
    twilioMessaging.messages.create({
        from: '+17249127087',
        to: '+14084381380',
        body: "It seems you have been in contact with someone with COVID. Stay indoors and stay safe!"
      })
      .then((message) => console.log(message))
      .catch((error) => console.log(error))

}

module.exports = {
    notifyCovid
}