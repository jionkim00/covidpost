const http = require('http');
const express = require('express');
const cors = require('cors');


const app = express();
const server = http.createServer(app);

app.use(cors());


server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));