import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import './App.css'

// Weather code mappings
const weatherCodeMap = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
  55: 'Heavy drizzle', 61: 'Slight rain', 63: 'Moderate rain',
  65: 'Heavy rain', 71: 'Slight snow', 73: 'Moderate snow',
  75: 'Heavy snow', 80: 'Rain showers', 81: 'Moderate rain showers',
  82: 'Violent rain showers', 95: 'Thunderstorm'
}

const getWeatherIcon = (code) => {
  const iconMap = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️', 61: '🌦️', 63: '🌧️',
    65: '🌧️', 71: '🌨️', 73: '🌨️', 75: '🌨️', 80: '🌦️',
    81: '🌧️', 82: '⛈️', 95: '⛈️'
  }
  return iconMap[code] || '🌈'
}

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchWeather = async (city) => {
    if (!city.trim()) return

    setLoading(true)
    setError('')
    setWeatherData(null)

    try {
      // Get city coordinates first
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      )
      const geoData = await geoResponse.json()

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please try another name.')
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      // Get weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`
      )
      const weatherData = await weatherResponse.json()

      if (!weatherData.current_weather) {
        throw new Error('Weather data not available for this location.')
      }

      const currentWeather = weatherData.current_weather
      const enhancedWeather = {
        ...currentWeather,
        weathercode_description: weatherCodeMap[currentWeather.weathercode] || 'Unknown conditions',
        weather_icon: getWeatherIcon(currentWeather.weathercode)
      }

      setWeatherData({
        current_weather: enhancedWeather,
        location: { name, country }
      })

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setError('')
  }

  return (
    <div className="app">
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">Weather Now</h1>
        </div>

        <SearchBar onSearch={searchWeather} loading={loading} />

        <WeatherDisplay 
          weatherData={weatherData}
          loading={loading}
          error={error}
          onRetry={handleRetry}
        />

        
      </div>
    </div>
  )
}

export default App