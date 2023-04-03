import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
    })

    const dispatch = useNotificationDispatch()

    const onCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate(
            { content, votes: 0 },
            {
                onError: (error) => {
                    dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: error.response.data.error,
                    })
                },
                onSuccess: () => {
                    const message = `You added: ${content}`
                    dispatch({ type: 'ADD_NOTIFICATION', payload: message })
                },
            }
        )
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
