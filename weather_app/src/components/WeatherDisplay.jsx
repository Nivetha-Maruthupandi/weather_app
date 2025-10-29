import React from 'react'

const WeatherDisplay = ({ weatherData, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="weather-display loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Fetching weather data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-message">
        <div className="error-icon">⚠️</div>
        <div className="error-title">Oops! Something went wrong</div>
        <div className="error-details">{error}</div>
        <button onClick={onRetry} className="error-retry-button">
          Try Again
        </button>
      </div>
    )
  }

  if (!weatherData) {
    return (
      <div className="weather-display welcome">
        <div className="welcome-icon">🌤️</div>
        <h2 className="welcome-title">Welcome to Weather Now</h2>
        <p className="welcome-message">
          Enter a city name to get the current weather conditions
        </p>
      </div>
    )
  }

  const { current_weather, location } = weatherData
  
  return (
    <div className="weather-display active">
      <div className="weather-header">
        <h2 className="location-name">{location.name}</h2>
        {location.country && (
          <p className="location-details">{location.country}</p>
        )}
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">{current_weather.weather_icon}</div>
        <div className="temperature">{Math.round(current_weather.temperature)}°C</div>
        <div className="weather-description">{current_weather.weathercode_description}</div>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <div className="detail-label">Wind Speed</div>
          <div className="detail-value">{current_weather.windspeed} mph</div>
        </div>
        <div className="weather-detail">
          <div className="detail-label">Wind Direction</div>
          <div className="detail-value">{current_weather.winddirection}°</div>
        </div>
      </div>

      <div className="weather-footer">
        Last updated: {new Date(current_weather.time).toLocaleTimeString()}
      </div>
    </div>
  )
}

export default WeatherDisplay