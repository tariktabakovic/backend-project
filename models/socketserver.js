const io = require('socket.io')('http://localhost:3007/chatrooms')
const users = require('./models/users');


io.on('connection', socket =>{
    socket.on('new-user', users =>{
        users[username] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[username]})
    })
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[username])
        delete users[username]
    })
})