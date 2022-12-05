import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
  ])
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

    setPersons(persons.concat(personToAdd))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <h2>Filter</h2>
        name: <input value={nameFilter} onChange={handleNameFilterChange} />
      </div>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
        <h2>Add new</h2>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name}: {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App