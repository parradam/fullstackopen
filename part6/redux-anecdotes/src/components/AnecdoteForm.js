import { addAnecdoteAndNotify } from '../reducers/anecdotesSlice'
import { useDispatch } from 'react-redux'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const message = `You added: ${content}`
        event.target.anecdote.value = ''
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(addAnecdoteAndNotify({ newAnecdote, message }))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
