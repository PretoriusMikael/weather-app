import React, { useState } from "react";
import "../styles/WeatherInput.css";
import GetLocation from "./getLocation"; //new

// Functional component to retrieve input from user
export default function WeatherInput() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // if an event occurs, change the state of weather to that value (used in input tag for city)
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  // fetching the weather API
  async function fetchWeather(event) {
    event.preventDefault(); // prevents the button from submitting
    setWeather(null);

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9066240b806746b38c1180721241207&q=${city}`);
      if (!response.ok) {
        // if city was not found in the API
        throw new Error("City not found.");
      }
      const data = await response.json();
      setWeather(data); // change state of weather to the data fetched from the API
    } catch (error) {
      console.error("Error fetching data:", error);
      setWeather(null); // state of weather stays null
    }
  }

  // output
  return (
    <div className="weather-app">
      <h1 className="title">Weather App</h1>
      <form onSubmit={fetchWeather} className="weather-form">
        <input type="text" value={city} onChange={handleChange} placeholder="Enter city name" className="input" />
        <button type="submit" className="button">
          Show Weather
        </button>
      </form>
      {weather && weather.current && (
        <div className="weather-info">
          <h2 className="city">{weather.location.name}</h2>
          <p className="temperature">Temperature: {weather.current.temp_c} °C</p>
          <p className="conditions">
            Conditions:
            <img src={weather.current.condition.icon} alt="Condition icon" className="icon" />
            {weather.current.condition.text}
          </p>
          <p>Feels like: {weather.current.feelslike_c} °C</p>
          <p className="wind">
            Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}
          </p>
          <p className="humidity">Humidity: {weather.current.humidity}%</p>
          <p className="uv-index">UV Index: {weather.current.uv}</p>
        </div>
      )}
      <GetLocation setCity={setCity} /> {/*use GetLocation functional component*/}
    </div>
  );
}
