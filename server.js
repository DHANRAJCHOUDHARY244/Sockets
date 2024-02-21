// index.js
const websocketClient = require('./server/web/websocketClient');
const expressServer = require('./server/expressServer/expressServer');
const io = require('./server/chat/socketServer').getIo;

io()


console.log('----------------All modules are now connected and running.----------------------');
