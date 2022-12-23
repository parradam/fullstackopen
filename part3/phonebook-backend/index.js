const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const logger = morgan.token('postData', request => {
    if (request.method === 'POST') return JSON.stringify(request.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
app.use(express.json())

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const result = phonebook.find(p => p.id === id)

    if (result) {
        response.json(result)
    } else {
        response.statusMessage = "No person found with this ID"
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const nameExists = phonebook.some(p => p.name === person.name)
    if (nameExists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    person.id = Math.round(Math.random() * 1000)
    phonebook = phonebook.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const result = phonebook.find(p => p.id === id)

    if (!result) {
        response.statusMessage = "Delete unsucessful. No person found with this ID"
        response.status(404).end()
    }

    phonebook = phonebook.filter(p => p.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const report = `<div>
                        <p>Phonebook has info for ${phonebook.length} people</p>
                        <p>${new Date()}<p>
                    </div>`
    
    response.send(report)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})