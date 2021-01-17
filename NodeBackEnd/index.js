'use strict';
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const { addUser } = require('./controllers/userController');
const { calculateGeolocationData } = require('./geolocation/geolocationConversion')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use(cors());

app.get('/', function(req,res) {
    let covid = true
    let name = 'BOB'
    let uid = '22222'
    addUser(name, uid, covid);
    console.log('hello');
    res.send('hello Sid');
});

app.get('/getName', function(req, res) {
    res.send('IT WORKed HARRY');
})

app.post('./getLangLong', function(req, res) {
    
})


server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));