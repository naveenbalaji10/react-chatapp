const users = []

const addUsers = ({ id, name, room }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()
  const existingUsers = users.find(
    (user) => user.name === name && user.room === room
  )
  const user = { id, name, room }
  if (!user || !room) return { error: 'user and name are required' }
  if (existingUsers) {
    return { error: 'username already taken' }
  }
  users.push(user)
  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUserInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUsers, removeUser, getUser, getUserInRoom }
