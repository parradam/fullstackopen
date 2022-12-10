import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Data from './Data'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const countriesToShow = countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleButtonClick = (textToUpdate) => {
    setFilter(textToUpdate)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Data countriesToShow={countriesToShow} handleButtonClick={handleButtonClick} />
    </div>
  );
}

export default App