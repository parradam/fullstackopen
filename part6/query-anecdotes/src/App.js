import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const result = useQuery('anecdotes', getAnecdotes)
    const anecdotes = result.data ?? []

    const handleVote = (anecdote) => {
        console.log('vote')
    }

    if (result.isLoading) {
        return <div>Loading data...</div>
    }

    if (result.isError) {
        return <div>Ancedote service not available</div>
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default App
