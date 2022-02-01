const express = require('express')
const http = require('http')
const port = process.env.PORT || 3004
//setup
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const path = require('path')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

var name = "";

//whenever we get a new http connection - a new socket is created for that connection
io.on('connection', (socket) => {

    console.log("new user arrived")

    //mail - subject, body
    socket.on('joining msg', (username) =>
    {
        name = username
        //send information to other sockets
        //io.emit('chat message', "New person have joined : " + name)
        io.emit('joing ui message', "New person have joined : " + name)
    })

    socket.on('chat message', (msg) => {
        //will send the message to all socket expect the sending socket
        socket.broadcast.emit('chat message', msg)
    })

})

server.listen(port, () => {
    console.log("server started at ", port)
})