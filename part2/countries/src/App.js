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

  // https://restcountries.com/v3.1/all

  useEffect(() => {
    axios
      .get('countries.json')
      .then(response => {
        setCountries(response.data.slice(0, 200))
      })
  }, [])

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Data countriesToShow={countriesToShow} />
    </div>
  );
}

export default App