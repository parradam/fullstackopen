import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from './NotificationContext'
import { getAnecdotes, voteAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const result = useQuery('anecdotes', getAnecdotes)
    const anecdotes = result.data ?? []

    const queryClient = useQueryClient()
    const voteAnecdoteMutation = useMutation(voteAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
    })

    const dispatch = useNotificationDispatch()

    const handleVote = (anecdote) => {
        voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        const message = `You voted for: ${anecdote.content}`
        dispatch({ type: 'ADD_NOTIFICATION', payload: message })
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
