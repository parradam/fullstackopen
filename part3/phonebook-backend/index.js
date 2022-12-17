const express = require('express')
const app = express()

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

app.get('/info', (request, response) => {
    const report = `<div>
                        <p>Phonebook has info for ${phonebook.length} people</p>
                        <p>${new Date()}<p>
                    </div>`
    
    response.send(report)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})