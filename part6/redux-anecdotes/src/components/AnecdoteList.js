import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.sort((a, b) => b.votes - a.votes)
    )
    const dispatch = useDispatch()

    const handleVote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
    }

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdoteList
