import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => (
    <div>
        <h2>Anecdotes</h2>
        <Filter />
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
    </div>
)

export default App
