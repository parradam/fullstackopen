import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdotesSlice'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdotesService
            .getAll()
            .then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
    }, [dispatch])
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
