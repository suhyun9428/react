import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import WeatherBox from "./component/WeatherBox";
import WeatherBtn from "./component/WeatherBtn";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자 마자 현재 위치 기반의 날씨 노출(날씨 정보 : 도시, 섭씨 / 화씨, 날씨 상태 정보)
// 2. 버튼 5개(현재 위치 / 4개는 다른 도시 - 상하이, 나고야, 런던, )
// 3. 도시 버튼을 클릭할 때마다 도시별 날씨 노출
// 4. 현재 위치 버튼을 클릭하면 다시 현재 위치 기반으로 노출
// 5. 데이터를 들고 오는 동안 로딩 스피너 화면 구현

const cities = ["SHANGHAI", "NAGOYA", "LONDON", "SEOUL"];

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setAPIError] = useState("");

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5ec9e8ded81e2d1bcceae8bb9d1a441d&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      // await 쓰려면 비동기여야함(async)
      setWeather(data);
      setLoading(false);
    } catch(err){
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // let lat = position.coords.latitude;
      // let lon = position.coords.longitude;
      const {latitude, longitude} = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCity = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ec9e8ded81e2d1bcceae8bb9d1a441d&units=metric`;
      let res = await fetch(url);
      let data = await res.json();

      setWeather(data);
      setLoading(false);
    }catch(err){
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (city == null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);
  
  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <>
      <Container className="vh-100">
        {loading ? (
          <div className="w-100">
            <ClipLoader color="#f88c6b" size={150} loading={loading} />
          </div>
        ) : !apiError ? (
          <div className="container">
            <WeatherBox weather={weather} />
            <WeatherBtn
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        ) : (
          apiError
        )}
      </Container>
    </>
  );
}

export default App;
