import { configureStore } from '@reduxjs/toolkit'
import anecdotesSlice from './reducers/anecdotesSlice'
import filterSlice from './reducers/filterSlice'

const store = configureStore({
    reducer: {
        anecdotes: anecdotesSlice,
        filter: filterSlice,
    },
})

export default store
