import React from 'react'

function VoteButton({handleClick, anecdote}) {
  return (
    <button onClick={handleClick} id={anecdote}>vote</button>
  )
}

export default VoteButton