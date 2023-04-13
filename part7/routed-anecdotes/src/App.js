import { useState } from 'react'
import { Link, Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
    const padding = {
        paddingRight: 5,
    }
    return (
        <div>
            <Link style={padding} to="/">
                anecdotes
            </Link>
            <Link style={padding} to="/create">
                create new
            </Link>
            <Link style={padding} to="/about">
                about
            </Link>
        </div>
    )
}

const AnecdoteList = ({ anecdotes, notification }) => (
    <div>
        <h2>Anecdotes</h2>
        <Notification notification={notification} />
        <ul>
            {anecdotes.map((anecdote) => (
                <li key={anecdote.id}>
                    <Link to={`/anecdotes/${anecdote.id}`}>
                        {anecdote.content}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

const AnecdoteDetail = ({ anecdote }) => {
    if (anecdote)
        return (
            <>
                <h2>
                    {anecdote.content} by {anecdote.author}
                </h2>
                <p>has {anecdote.votes} votes</p>
                <p>
                    for more info see{' '}
                    <a href={anecdote.info}>{anecdote.info}</a>
                </p>
            </>
        )

    return <h2>Anecdote not found</h2>
}

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
            An anecdote is a brief, revealing account of an individual person or
            an incident. Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter but
            to reveal a truth more general than the brief tale itself, such as
            to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative. An anecdote is "a
            story with a point."
        </em>

        <p>
            Software engineering is full of excellent anecdotes, at this app you
            can find the best and add more.
        </p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for{' '}
        <a href="https://fullstackopen.com/">Full Stack Open</a>. See{' '}
        <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
            https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
        </a>{' '}
        for the source code.
    </div>
)

const CreateNew = (props) => {
    const navigate = useNavigate()

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.attrs.value,
            author: author.attrs.value,
            info: info.attrs.value,
            votes: 0,
        })
        props.setNotification(`${content.attrs.value} created!`)
        setTimeout(() => props.setNotification(null), 5000)
        navigate('/')
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    content
                    <input {...content.attrs} />
                </div>
                <div>
                    author
                    <input {...author.attrs} />
                </div>
                <div>
                    url for more info
                    <input {...info.attrs} />
                </div>
                <button>create</button>
                <button type="reset">reset</button>
            </form>
        </div>
    )
}

const Notification = ({ notification }) => {
    return notification && <p>{notification}</p>
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1,
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2,
        },
    ])

    const match = useMatch('/anecdotes/:id')
    const anecdote = match
        ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
        : null

    const [notification, setNotification] = useState(null)

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        }

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
    }

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Routes>
                <Route path="/about" element={<About />} />
                <Route
                    path="/create"
                    element={
                        <CreateNew
                            addNew={addNew}
                            setNotification={setNotification}
                        />
                    }
                />
                <Route
                    path="/"
                    element={
                        <AnecdoteList
                            anecdotes={anecdotes}
                            notification={notification}
                        />
                    }
                />
                <Route
                    path="/anecdotes/:id"
                    element={<AnecdoteDetail anecdote={anecdote} />}
                />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
