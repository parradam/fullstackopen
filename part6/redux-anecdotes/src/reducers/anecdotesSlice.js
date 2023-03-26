import { createSlice } from '@reduxjs/toolkit'
import { setNotification, removeNotification } from './notificationSlice'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload
        },
        createAnecdote(state, action) {
            const content = action.payload
            state.push({
                content,
                id: getId(),
                votes: 0,
            })
        },
        addVote(state, action) {
            const id = action.payload
            return state.map((anecdote) =>
                anecdote.id === id
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote
            )
        },
    },
})

export const handleVote = ({ id, message }) => {
    return (dispatch) => {
        dispatch(addVote(id))
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export const handleAddAnecdote = ({ content, message }) => {
    return (dispatch) => {
        dispatch(createAnecdote(content))
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export const { setAnecdotes, createAnecdote, addVote } = anecdotesSlice.actions
export default anecdotesSlice.reducer
