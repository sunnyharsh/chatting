

var express =require('express');
var app=express();
var socket=require('socket.io');
app.use(express.static('./public/'))
var server=app.listen(4000 , ()=>{
    console.log("server start on 4000");
})
//server pass in socket argument
var io=socket(server);

//connection make in starting once
io.on('connection' , (socket)=>{
    console.log("socket connection made....");

    //data recieve by frontend means client
    socket.on('chat' , (data)=>{
        //data send all sockets whose are connected to this server 
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing' ,data);
    });
})