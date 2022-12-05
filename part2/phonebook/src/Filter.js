import React from 'react'

function Filter({ filter, handleFilterChange }) {
  return (
    <div>
        name: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter