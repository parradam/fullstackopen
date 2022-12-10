import React from 'react'

function Button({ textToUpdate, handleButtonClick }) {
  return (
    <button onClick={() => handleButtonClick(textToUpdate)}>show</button>
  )
}

export default Button