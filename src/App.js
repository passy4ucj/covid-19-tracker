import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import './App.css';

//https://disease.sh/v3/covid-19/countries
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  //UseEffect runs a piece of code based on a condition
  useEffect(() => {
    //runs when the component loads
    //async request to the server
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
         const countries = data.map((country) => ({
             name: country.country,
             value: country.countryInfo.iso2, //UK, USA
         }));
       
      setCountries(countries);
    });
  };
  getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            {/* <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">Option 1</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title + Select dropdown field*/}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}

      {/* Footer */}
    </div>
  );
}

export default App;
