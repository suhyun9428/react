import React from "react";

const WeatherBox = ({ weather }) => {
  // console.log("weather", weather);
  return (
    <div className="box__wrapper">
      <h1 className="title">{weather && weather.name}</h1>
      {/* <div>{weather?.name}</div> */}
      <h2 className="subtitle__today--temp">
        {weather?.main.temp}°C / {Math.round((weather?.main.temp * 1.8 + 32 )* 100) / 100} °F
      </h2>
      <div className="box__temp">
        <span className="subtitle">MAX</span> {weather?.main.temp_max}°C / <span className="subtitle">MIN</span> {weather?.main.temp_min} °C
      </div>
      <p>{weather?.weather[0].description}</p>
      <p>Humidity {weather?.main.humidity} %</p>
    </div>
  );
};

export default WeatherBox;
