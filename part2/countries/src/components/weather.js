import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  const key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${key
        }&query=${city.toLowerCase()}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [city]);

  return (
    <div>
      <p>
        <b>Temperature:</b> {weather.temperature} Celcius
      </p>
      <img
        width="150"
        src={weather.weather_icons}
        alt={city}
      />
      <p>
        <b>Wind:</b> {weather.wind_speed} mph
        direction {weather.wind_dir}
      </p>
    </div>
  )
}

export default Weather;