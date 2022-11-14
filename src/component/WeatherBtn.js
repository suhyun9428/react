import React from "react";
import { Button } from "react-bootstrap";

const WeatherBtn = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div className="box__buttons">
      <Button
        className="button__city"
        variant={`${selectedCity == null ? "outline-warning" : "warning"}`}
        onClick={() => handleCityChange("current")}
      >
        HERE
      </Button>

      {cities.map((city, index) => (
        <Button
          className="button__city"
          variant={`${selectedCity == city ? "outline-warning" : "warning"}`}
          onClick={() => handleCityChange(city)}
          key={index}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherBtn;
