'use strict';
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const { addUser, updateCovid, addCloseContacts, updateDataTable } = require('./controllers/userController');
const { calculateGeolocationData } = require('./geolocation/geolocationConversion')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use(cors());

app.post('/addUser', function(req,res) {
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

app.put('/updateCovidStatus', function(req, res) {
    try{
        let name = req.query.name;
        let uid = req.query.uid;
        let covid = req.query.covid;
        updateCovidStatus(name, uid, covid);
        res.send(200).send('Successfully recorded');
    }
    catch(err){
        res.send(500).send('Server Error');
    }
});

// some HTTP issues
app.get('/addContacts', function(req, res) {
  try {
    console.log("index")
    let uid1 = req.query.uid1;
    let uid2 = req.query.uid2;
    addCloseContacts(uid1, uid2);
    res.sendStatus(200).send('Successfully received');
  }
  catch(err) {
    res.sendStatus(500).send('Server Error');
  }
})

// same HTTP issue
app.put('/updateDataTable', function(req, res) {
  try {
    let name = req.query.name;
    let uid = req.query.uid;
    let lat = req.query.lat;
    let long = req.query.long;
    let time = req.query.time;
    updateDataTable(name, uid, lat, long, time);
    res.sendStatus(200).send('Successfully recorded');
  }
  catch(err) {
    res.sendStatus(500).send('Server Error');
  }
})


app.post('/')

//data 

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));