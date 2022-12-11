import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'

import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()))

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personToAdd = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.some(person => person.name === personToAdd.name)

    if (personExists) {
      alert(`${personToAdd.name} is already added to phonebook`)
      return
    }

    phonebookService
      .create(personToAdd)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPhonebook) => {
        setPersons(initialPhonebook)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Filter</h3>
      <Filter
        filter={nameFilter}
        handleFilterChange={handleNameFilterChange}
      />

      <h3>Add new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
      />
    </div>
  )
}

export default App