require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

const requestLogger = (request, response, next) => {
    console.log(
        '-- Method:', request.method,
        '-- Path:', request.path,
        '-- Request body:', request.body
    )
    next()
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

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

app.post('/api/persons', (request, response, next) => {
    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const detailsToUpdate = {
        name: request.body.name,
        number: request.body.number,
    }

    Person.findByIdAndUpdate(
      request.params.id,
      detailsToUpdate,
      { new: true,
        runValidators: true,
        context: 'query' }
      )
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => {
        console.log(error)
        next(error)
      })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(person => {
        response.status(204).end()
      })
      .catch(error => {
        next(error)
      })
})

app.get('/info', (request, response, next) => {
    Person.count({})
      .then(count => {
          const report = `<div>
                           <p>Phonebook has info for ${count} people</p>
                           <p>${new Date()}<p>
                          </div>`

          response.send(report)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'incorrectly formatted ID' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})