import React from 'react'
import Flag from './Flag'
import Languages from './Languages'

function Data({ countriesToShow }) {

  const showData = () => {
    if(countriesToShow.length > 10) {
        return <div>{countriesToShow.length} results found. Please refine your search.</div>
    } else if(countriesToShow.length > 1) {
        return (
          <ul>
            {countriesToShow.map(country => <li key={country.name.official}>{country.name.official}</li>)}
          </ul>
        )
    } else if(countriesToShow.length === 1) {
        return (
            <div>
              {countriesToShow.map(country => (
                <div key={country.name.official}>
                  <h2>{country.name.official}</h2>
                  <div>capital: {country.capital}</div>
                  <div>area: {country.area}</div>
                  <Languages languages={country.languages} />
                  <Flag url={country.flags.png} alt={`Flag of ${country.name.official}`} />
                </div>
                ))}
            </div>
        )
    }
  }
  
  return (
    <div>
        {showData()}
    </div>
  )
}

export default Data