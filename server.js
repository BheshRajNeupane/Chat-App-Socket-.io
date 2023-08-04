const express = require('express');
//creating socket server
const Socket = require('socket.io') // use to communications

const app = express();
const port = 3005;
const server = require('http').createServer(app);

const users= [];//hold all connected username

server.listen(port,()=>{
    console.log("Listening on port", port);
})

//io intances help to establish bidirectional communication
const io = Socket(server,{
     cors:{
         origin:'*',
         methods:["Get" , "PO"]
     }
})


io.on("connection",(socket)=>{
     //console.log("socket is an obect",socket);
       console.log("connected to",socket.id);
    //add new users to connection
       socket.on("adduser",(username)=>{
       socket.user=username;
       users.push(username);
       io.sockets.emit("users",users)//so io hold updated users list
    })


    // msg to connected all client  
    socket.on("message" ,(message)=>{
        io.sockets.emit("message_client", {
            message:message,
            user:socket.user
        })
      
    }) 

    //disconnect active user
    socket.on("disconnect",()=>{
        console.log("We are disconnecting:",socket.user);

        if(socket.user){
            users.splice(users.indexOf(socket.user),1);

         io.sockets.emit("users",users);//call socket.on("user",)-->IN CLIENT Side and update users
         console.log("remainig users:",users);   
        }
    })
 
})