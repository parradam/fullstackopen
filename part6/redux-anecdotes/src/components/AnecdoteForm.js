import { createAnecdote } from '../reducers/anecdotesSlice'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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
