const express = require('express');
const cors = require('cors');
const app = express();
const socketIo = require('socket.io');
app.use(cors());
const http = require('http');


app.get("/hello", (req, res) => {
  res.send("ehellot there");
})
const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: 'https://web-craft-emergency-hub.vercel.app',
    methods: ['GET', 'POST'],
  },
});

let emergencyreq = []
let user = new Map();

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("hi",()=>{
    console.log("working")
  })

  socket.on("emereq",(data)=>{
    emergencyreq.push({by:data.reqname,type:data.reqtype,time:data.time,date:data.date})
    console.log(data)
    // socket.emit("emergency",(data));
    io.emit("emergency",data);
  })

  socket.on("getnotification",(d)=>{
    console.log("req for noti");
    socket.emit("notification",emergencyreq)
  })

  socket.on("register",(data)=>{
    console.log(data);
    user.set(data.mail,data.password)
    console.log(user)
  })

  socket.on("login", (data) => {
    const { email, password } = data;
    console.log(email,password,"hi")
    if (user.has(email)) {
        const savedPassword = user.get(email);
        if (password === savedPassword) {
            socket.emit("loginres", "correct");
        } else {
            socket.emit("loginres", "wrong");
        }
    } else {
        socket.emit("loginres", "wrong");
    }
});


});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
