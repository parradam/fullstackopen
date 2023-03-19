import { addVote, createAnecdote } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const anecdotes = useSelector((state) => state)
    const dispatch = useDispatch()

    const handleVote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
    }

    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
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
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App
