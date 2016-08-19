"use strict";

var http = require("http")
var express = require("express")
var socketIo = require('socket.io')


const app = express();

app.set("view engine", "jade");

app.use(express.static('./public'))

app.get('/',(req,res,next)=>{
  res.end('hellow world')
});

app.get('/home',(req,res,next)=>{
  res.render('index', {title: "title"})
});

const server = new http.Server(app);
//applications view from the server
const io = socketIo(server)

io.on("connection", socket => {
  console.log("Client connected");
  socket.on("chat:add", data => {
    console.log(data);
    io.emit("chat:added", data)
  });
});


const port = 3000



server.listen(port, ()=>{
  console.log(`server started on port ${port}`);
})
