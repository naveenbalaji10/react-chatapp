import React from 'react'
import './message.css'
import ReactEmoji from 'react-emoji'

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false
  const trimmedName = name.trim().toLowerCase()

  if (user === trimmedName) {
    isSentByCurrentUser = true
  }
  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{user}</p>
      <div className='messageBox bg-blue'>
        <p className='messageText clr-white'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox bg-light'>
        <p className='messageText clr-dark'>{ReactEmoji.emojify(text)}</p>
      </div>
      <p className='sentText pl-10'>{user}</p>
    </div>
  )
}

export default Message
