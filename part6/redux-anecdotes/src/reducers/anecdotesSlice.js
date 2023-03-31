import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationSlice'
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
        incrementVote(state, action) {
            const { id, votes } = action.payload
            return state.map((anecdote) =>
                anecdote.id === id ? { ...anecdote, votes } : anecdote
            )
        },
    },
})

export const { setAnecdotes, appendAnecdote, incrementVote } =
    anecdotesSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const addVote = (id) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdotesService.updateVotes(id)
        const message = `You voted for: ${updatedAnecdote.content}`

        dispatch(incrementVote({ id, votes: updatedAnecdote.votes }))
        dispatch(setNotification(message, 5))
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const anecdote = await anecdotesService.createNew(content)
        const message = `You added: ${anecdote.content}`

        dispatch(appendAnecdote(anecdote))
        dispatch(setNotification(message, 5))
    }
}

export default anecdotesSlice.reducer
