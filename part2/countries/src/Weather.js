import { useEffect, useState } from 'react'
import axios from 'axios'

function Weather({ capital, capitalInfo }) {
  const api_key = process.env.REACT_APP_API_KEY

  const [weatherData, setWeatherData] = useState()
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [api_key, capitalInfo])

  return (
    <div>
      {weatherData &&
        <>
          <h2>Weather in {capital}</h2>
          <div>temperature: {weatherData && Math.round(10 * (parseInt(weatherData.main.temp) - 273.15)) / 10} deg C</div>
          <div>
            {weatherData && <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />}
          </div>
          <div>wind: {weatherData && weatherData.wind.speed} m/s</div>
        </>
      }
    </div>
  )
}

export default Weather