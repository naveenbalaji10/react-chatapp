const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const router = require('./router')

const { addUsers, removeUser, getUser, getUserInRoom } = require('./users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors())

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUsers({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)
    socket.emit('message', {
      user: 'admin',
      text: `${user.name},welcome to the room ${user.room}`,
    })
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` })
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room),
    })

    callback()
  })
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', { user: user.name, text: message })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUserInRoom(user.room),
      })
    }

    callback()
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name},has left the room`,
      })
    }
  })
})

server.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
