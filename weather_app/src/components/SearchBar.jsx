import React, { useState } from 'react'

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim() && !loading) {
      onSearch(city.trim())
    }
  }

  const handleClear = () => {
    setCity('')
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
            disabled={loading}
          />
          {city && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="search-button"
        >
          {loading ? (
            <div className="search-button-loading">
              <div className="loading-spinner-small"></div>
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  )
}

export default SearchBar