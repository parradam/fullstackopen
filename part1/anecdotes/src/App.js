import { useState } from 'react'
import VoteButton from './VoteButton'
import Button from './Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([])
  const anecdoteWithMaxPoints = points.reduce((prev, curr) => prev.votes > curr.votes ? prev : curr, false)

  const voteForAnecdote = (e) => {
    const votedAnecdote = parseInt(e.target.id)
    const found = points.find(obj => { return obj.id === votedAnecdote })

    if (typeof found === "undefined") {
      setPoints(prevState => [...prevState, { id: votedAnecdote, votes: 1 }])
    } else {
      setPoints(prevState => prevState.map(obj => {
        if (obj.id === votedAnecdote) {
          obj.votes++
        }
        return obj
      })
      )
    }
  }

  const randomiseSelection = () => {
    const randomNumber = Math.floor(Math.random() * (anecdotes.length));
    setSelected(randomNumber)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {points.find(obj => obj.id === selected) ? points.find(obj => obj.id === selected).votes : "no"} votes
      </p>
      <VoteButton handleClick={(e) => voteForAnecdote(e)} anecdote={selected} />
      <Button handleClick={() => randomiseSelection()} />

      <h2>Anecdote with the most votes</h2>
      <p>
        {anecdoteWithMaxPoints && anecdotes[anecdoteWithMaxPoints.id]}
      </p>
      <p>
        {anecdoteWithMaxPoints && "has " + anecdoteWithMaxPoints.votes + " votes"}
      </p>
    </div>
  )
}

export default App