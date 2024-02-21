// index.js
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const ioModule = require('../chat/socketServer');

app.use(express.static('public'));

ioModule.attach(server);

server.listen(3000, () => {
  console.log('====================================');
  console.log('Server is running on port 3000');
  console.log('====================================');
});
