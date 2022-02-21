import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');

  

const url =`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=0G1vgC0oQj18gUyXgyjffHPGMVcf67cS&q=${location}&language=en-us&details=true`;

const search_location = (event) => {
  event.preventDefault();
  axios.get(url).then((response) => {
    console.log(response.data[0].Key);
    console.log(response.data);
    setData(response.data);
    console.log(data);
    return data[0];
  })
  setLocation('');
}
if(!data) {
  return null;
}

// const search_weather = (event) => {
  //   event.preventDefault();
  //   axios.get(weather_url).then((response) => {
    //     console.log(response.data);
    //     setWeather(response.data);
    //     console.log(data);
    //     })
    //     setWeather('');
    // };
    
const weather_url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${weather}?apikey=0G1vgC0oQj18gUyXgyjffHPGMVcf67cS&metric=true`;

  const search_weather = async (event) => {
    event.preventDefault();
    const response = await fetch(weather_url);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="App">
      <div className="div">
      <form onSubmit={search_weather}>
      <h1>Search for weather</h1>
      <input
      value={weather}
      onChange={event => setWeather(event.target.value)}
      type="text"
      name="title"
      id="title" />
      <br />
      <br />
      <input type="submit" value="Submit" className='submit-button' />
    </form>


      <form onSubmit={search_location}>
      <h1>Search for a city</h1>
      <input
      value={location}
      onChange={event => setLocation(event.target.value)}
      type="text"
      name="title"
      id="title" />
      <br />
      <br />
      <input type="submit" value="Submit" className='submit-button' />
    </form>
    <div>
    <ul>
  {data.map(city => {
    return (
      <li key={city.Key}>
        <h3>City: {city.EnglishName}</h3>
        <p>Country: {city.Country.EnglishName}</p>
        <p>Administrative area: {city.AdministrativeArea.EnglishName}</p>
        <p>Timezone code: {city.TimeZone.Code}</p>
        <p>GMT Offset: {city.TimeZone.GmtOffset}</p>
        <p>Latitude: {city.GeoPosition.Latitude}</p>
        <p>Longitude: {city.GeoPosition.Longitude}</p>
      </li>
    )
  })}
</ul>
    </div>
      </div>
    </div>
  );
}

export default App;
