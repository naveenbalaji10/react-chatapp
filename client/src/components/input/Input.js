import React from 'react'
import './input.css'

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className='form'>
      <input
        type='text'
        placeholder='please enter the text...'
        className='input'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <button className='sendButton' onClick={(event) => sendMessage(event)}>
        send
      </button>
    </form>
  )
}

export default Input
