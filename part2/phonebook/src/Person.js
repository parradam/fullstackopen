import React from 'react'

function Person({ person, handleDeletePerson }) {
  return (
    <li key={person.name}>
      {person.name}: {person.number}
      <button onClick={() => handleDeletePerson(person.id)}>
        delete
      </button>
    </li>
  )
}

export default Person