import { handleVote } from '../reducers/anecdotesSlice'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.anecdotes
            .filter((anecdote) =>
                anecdote.content
                    .toLowerCase()
                    .includes(state.filter.toLowerCase())
            )
            .sort((a, b) => b.votes - a.votes)
    )
    const dispatch = useDispatch()

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() =>
                                dispatch(
                                    handleVote({
                                        id: anecdote.id,
                                        message: `You voted for: ${anecdote.content}`,
                                    })
                                )
                            }
                        >
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdoteList
