'use strict';
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const { addUser, updateCovidStatus, 
        addCloseContacts, updateDataTable, 
        getGeoData, checkSimilarSurroudings,
        getPhoneNumbersforCovid, } = require('./controllers/userController');
const { calculateGeolocationData } = require('./geolocation/geolocationConversion')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use(cors());

app.get('/', async function(req, res) {
  getGeoData();
  res.send("it wrked")
})

app.post('/addUser', async function(req,res) {
    try{
        let name = req.query.name;
        let covid = req.query.covid === 'true';
        let phone = req.query.phone;
        let id = await addUser(name, covid, phone);
        res.send(id);
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

app.post('/updateCovidStatus', function(req, res) {
    try{
        let uid = req.query.uid;
        let covid = req.query.covid;
        updateCovidStatus(uid, covid);
        res.send("Successfully recorded");
    }
    catch(err){
        console.log(err);
        res.send("Server Error");
    }
});

// some HTTP issues
app.get('/addContacts', function(req, res) {
  try {
    console.log("index")
    let uid1 = req.query.uid1;
    let uid2 = req.query.uid2;
    // addCloseContacts(uid1, uid2);
    res.sendStatus(200).send('Successfully received');
  }
  catch(err) {
    res.sendStatus(500).send('Server Error');
  }
})

// same HTTP issue
app.put('/updateDataTable', function(req, res) {
  try {
    let uid = req.query.uid;
    let lat = req.query.lat;
    let long = req.query.long;
    updateDataTable(uid, lat, long);
    res.sendStatus(200).send('Successfully recorded');
  }
  catch(err) {
    res.sendStatus(500).send('Server Error');
  }
})

app.get('/surroundings', function(req, res) {
    try {
    let uid = req.query.uid;
    let lat = req.query.lat;
    let long = req.query.long;
    checkSimilarSurroudings(uid, lat, long);
    res.sendStatus(200).send('Successfully recorded');
    }
    catch(err) {
        res.sendStatus(500).send('Server Error');
    }
})

app.get('/phone', function(req, res) {
    try {
    let uid = req.query.uid;
    let lat = req.query.lat;
    let long = req.query.long;
    checkSimilarSurroudings(uid, lat, long);
    res.sendStatus(200).send('Successfully recorded');
    }
    catch(err) {
        res.sendStatus(500).send('Server Error');
    }
})
//data 

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));