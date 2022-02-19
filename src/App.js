import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');

const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=0G1vgC0oQj18gUyXgyjffHPGMVcf67cS&q=${location}&language=en-us&details=true`;

  const search_location = (event) => {
    event.preventDefault();
    axios.get(url).then((response) => {
      console.log(response.data);
      setData(response.data)
      console.log(data);
      })
      setLocation('');
  }

  return (
    <div className="App">
      <div className="div">
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


        <br />
        <br />
      {/* <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={search_location}
          placeholder='Enter Location'
          type="text"
      /> */}


        <div className="top"></div>
        <div className="location">
        </div>
      </div>
    </div>
  );
}

export default App;
