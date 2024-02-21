// socketServer.js
const Server = require('socket.io').Server;
let io;

function attach(server) {
  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('message', (data) => {
      console.log(data);
      socket.to(data.room).emit('message', data);
    });

    socket.on('join-room', (data) => {
      socket.join(data.roomName);
    });
    socket.on('disconnect',()=>{
      console.log(`user disconnected ${socket.id}`);
    })
  });
}

function getIo() {
  return io;
}

module.exports = { attach, getIo };
