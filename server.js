const express = require("express");
const { dirname } = require("path");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.Port || 3000;

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//socket

const io = require("socket.io")(http); //passing server
io.on("connection", (socket) => {
  //establishing web socket connection
  //jab bhi koi browser connect hoga, tab function call hoga
  //try opening the localhost on multiple tabs and browsers. Each of them will act as a unique client connection.
  console.log("Connected...");
  //listening to emit event
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg); //send events to all the connected clients except the sender
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
