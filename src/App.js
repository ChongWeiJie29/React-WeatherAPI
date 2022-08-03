import Search from './components/search';
import './App.css';
import CurrentWeather from './components/currentWeather';
import {useState} from 'react';
import Forecast from './components/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hidden, setHidden] = useState(true)

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    await fetch(`${process.env.REACT_APP_openWeatherAPIURL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_openWeatherAPIKey}&units=metric`)
    let weather = await fetch(`${process.env.REACT_APP_openWeatherAPIURL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_openWeatherAPIKey}&units=metric`).then(response => response.json())
    setCurrentWeather(weather);
    
    await fetch(`${process.env.REACT_APP_openWeatherAPIURL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_openWeatherAPIKey}&units=metric`)
    let forecast = await fetch(`${process.env.REACT_APP_openWeatherAPIURL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_openWeatherAPIKey}&units=metric`).then(response => response.json())
    setForecast(forecast);
    setHidden(false);
  };


  return (
    <div>
      <Search onSearchChangeHandle={handleOnSearchChange} />
      {hidden ? null : 
      <div>
        <CurrentWeather data={currentWeather} setHidden={setHidden} />
        <Forecast data={forecast}/>
      </div> 
      }
    </div>
  );
}

export default App;
