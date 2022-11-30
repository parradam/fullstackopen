import React from 'react'

function Button(props) {
  return (
    <button onClick={props.handleClick}>next anecdote</button>
  )
}

export default Button