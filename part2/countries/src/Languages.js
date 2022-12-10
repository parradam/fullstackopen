import React from 'react'

function Languages({ languages }) {
  return (
    <div>
      <ul>
      {Object.values(languages).map(language => (
        <li key={language}>{language}</li>
      ))}
      </ul>
    </div>
  )
}

export default Languages