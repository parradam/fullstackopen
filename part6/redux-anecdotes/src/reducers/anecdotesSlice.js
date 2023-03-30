import { createSlice } from '@reduxjs/toolkit'
import { setNotification, removeNotification } from './notificationSlice'
import anecdotesService from '../services/anecdotes'

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
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

export const { setAnecdotes, appendAnecdote, addVote } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const handleVote = ({ id, message }) => {
    return (dispatch) => {
        dispatch(addVote(id))
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const anecdote = await anecdotesService.createNew(content)
        const message = `You added: ${anecdote.content}`

        dispatch(appendAnecdote(anecdote))
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export default anecdotesSlice.reducer
