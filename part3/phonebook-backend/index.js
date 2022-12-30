require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    next()
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

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
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
          if (person) {
              response.json(person)
          } else {
              response.status(404).end()
          }
      })
      .catch(error => next(error))
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

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log('deleting')
    Person.findByIdAndDelete(request.params.id)
      .then(person => {
        response.status(204).end()
      })
      .catch(error => {
        next(error)
        // console.log(error.name, error.message)
        // response.statusMessage = "Delete unsucessful. No person found with this ID"
        // response.status(404).end()
      })
})

app.get('/info', (request, response) => {
    const report = `<div>
                        <p>Phonebook has info for ${phonebook.length} people</p>
                        <p>${new Date()}<p>
                    </div>`
    
    response.send(report)
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        if (request.method === 'GET') return response.status(400).send({ error: 'incorrectly formatted ID' })
        if (request.method === 'DELETE') {
            response.statusMessage = "Delete unsucessful. No person found with this ID"
            response.status(404).send()
        }
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})