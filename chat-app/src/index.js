const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Filter = require("bad-words");
const { generateMessage, generateLocation } = require("./utills/messages");
const { addUser, getUser, getUserInRoom, removeUser } = require('./utills/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));


io.on("connection", (socket) => {
  console.log("new web-socket connected");

  socket.on("join", ({ username, room },callback) => {
    const {error, user} = addUser({id:socket.id, username, room})

    if(error){
      return callback(error)
    }

    socket.join(user.room);

    socket.emit("message", generateMessage('admin',"Welcome!"));
    socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has joined`));

    io.to(user.room).emit('roomData',{
      room:user.room,
      users:getUserInRoom(user.room)
    })

    callback( )

    //socket.emit sends message just for the client, io.emit sends message to everyone, socket.broadcast.emit sends message to everyone but the client

    //io.to.emit will send message to everyone in the room and socket.broadcast.io.emit swill send the message to everyone but the sender
  });

  socket.on("sendMessage", (msg, callback) => {
    
    const user = getUser(socket.id)

    const filter = new Filter();

    if (filter.isProfane(msg)) {
      return callback("profanity not allowed");
    }
    io.to(user.room).emit("message", generateMessage(user.username,msg));
    callback("delivered");
  });

  socket.on("sendLocation", (location, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit(
      "locationMessage",
      generateLocation( user.username,
        `https://google.com/maps?q=${location.latitude},${location.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id)

    if(user){
      io.to(user.room).emit("message", generateMessage(`${user.username} has left!`));
      io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUserInRoom(user.room)
      })
    }

  });

  // socket.emit('countUpdated',count)

  // socket.on("increment",()=>{
  //     count++
  //     //this emits the event or make changes to only one client
  //     //socket.emit('countUpdated',count)

  //     //this will make changes on every client and update it
  //     io.emit('countUpdated',count)
  // })
});

server.listen(port, () => {
  console.log("app running on port: " + port);
});
