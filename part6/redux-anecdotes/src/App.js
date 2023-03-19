import { addVote } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
    const anecdotes = useSelector((state) =>
        state.sort((a, b) => b.votes - a.votes)
    )
    const dispatch = useDispatch()

    const handleVote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
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
            <AnecdoteForm />
        </div>
    )
}

export default App
