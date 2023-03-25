import { handleAddAnecdote } from '../reducers/anecdotesSlice'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    return (
        <>
            <h2>create new</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    const content = event.target.anecdote.value
                    const message = `You added: ${content}`
                    event.target.anecdote.value = ''
                    dispatch(handleAddAnecdote({ content, message }))
                }}
            >
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
