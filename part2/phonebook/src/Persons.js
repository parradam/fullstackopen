import React from 'react'
import Person from './Person'

function Persons({ personsToShow, handleDeletePerson }) {
  return (
    <ul>
        {personsToShow.map(person =>
          <Person
            key={person.id}
            person={person}
            handleDeletePerson={handleDeletePerson}
          />)}
    </ul>
  )
}

export default Persons