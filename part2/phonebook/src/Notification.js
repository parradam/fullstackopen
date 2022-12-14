import React from 'react'

function Notification({ message }) {
  if (message === null) {
    return null
  }

  if (message.error) {
    return (
      <div className='error'>
        {message.text}
      </div>
    )
  }

  return (
    <div className='success'>
      {message.text}
    </div>
  )
}

export default Notification