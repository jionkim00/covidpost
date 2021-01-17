'use strict';
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const { addUser, updateCovid } = require('./controllers/userController');
const { calculateGeolocationData } = require('./geolocation/geolocationConversion')
const { notifyCovid } = require('./twilioMessaging/twillioFunctions')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use(cors());

app.post('/', function(req,res) {
    try{
        let covid = req.query.covid === 'true';
        let name = req.query.name;
        let uid = req.query.uid;
        addUser(name, uid, covid);
        res.send('Successfully logged');
    }
    catch(err){
        res.send('Server Error')
    }

});

app.post('/getLangLong', function(req, res) {
    try{
        let latitude = req.query.latitude;
        let longitude = req.query.longitude;
        let uid = req.query.uid;
        addLangLong(latitude, longitude, uid);
        res.send(200).send('Successfully recorded');
    }
    catch(err){
        res.send(500).send('Server Error')
    }
});

app.post('./updateCovidStatus', function(req, res) {
    try{
        let uid = req.query.uid;
        let covid = req.query.covid;
        updateCovidStatus(uid, covid);
        res.send(200).send('Successfully recorded');
    }
    catch(err){
        res.send(500).send('Server Error')
    }

});

app.get('/twilio', async function(req, res) {
    const val = await notifyCovid();
    res.send(val);
})

//data 
 
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));