import React from 'react'
import Button from './Button'
import Flag from './Flag'
import Languages from './Languages'
import Weather from './Weather'

function Data({ countriesToShow, handleButtonClick }) {

  const showData = () => {
    if(countriesToShow.length > 10) {
        return <div>{countriesToShow.length} results found. Please refine your search.</div>
    } else if(countriesToShow.length > 1) {
        return (
          <ul>
            {countriesToShow.map(country => <li key={country.name.official}>{country.name.official} <Button textToUpdate={country.name.official} handleButtonClick={handleButtonClick} /></li>)}
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
                  <Weather capital={country.capital} capitalInfo={country.capitalInfo} />
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