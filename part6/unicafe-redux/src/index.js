import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
    const counter = store.getState()
    return (
        <div>
            <div>
                <button onClick={() => store.dispatch({ type: 'GOOD' })}>
                    good
                </button>
                <button onClick={() => store.dispatch({ type: 'OK' })}>
                    ok
                </button>
                <button onClick={() => store.dispatch({ type: 'BAD' })}>
                    bad
                </button>
                <button onClick={() => store.dispatch({ type: 'ZERO' })}>
                    reset stats
                </button>
            </div>
            <div>
                <ul>
                    <li>good: {counter.good}</li>
                    <li>ok: {counter.ok}</li>
                    <li>bad: {counter.bad}</li>
                </ul>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
