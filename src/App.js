import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
import { sortData, prettyPrintStat } from './util';
import numeral from 'numeral';
import './App.css';


//https://disease.sh/v3/covid-19/countries
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }, [])

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

        const sortedData = sortData(data);
      setTableData(sortedData);
      setMapCountries(data);
      setCountries(countries); 
    });
  };
  getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);

      //All the data from the country response
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
    
    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  };

  console.log("Country Info >>>", countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" 
            onChange={onCountryChange}
            value={country} >
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
        
        <div className="app__stats">
          <InfoBox 
          title="Coronavirus Cases" 
          cases={prettyPrintStat(countryInfo.todayCases)} 
          total={prettyPrintStat(countryInfo.cases)}  />
          <InfoBox 
          title="Recovered" 
          cases={prettyPrintStat(countryInfo.todayRecovered)} 
          total={prettyPrintStat(countryInfo.recovered)}  />
          <InfoBox 
          title="Deaths" 
          cases={prettyPrintStat(countryInfo.todayDeaths)} 
          total={prettyPrintStat(countryInfo.deaths)}  />
        </div>
        

        

        {/* Map */}
        <Map 
          countries={mapCountries}
          casesType={casesType}
          center = {mapCenter}
          zoom = {mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph casesType={casesType} />
          {/* Graph */}
        </CardContent>
      </Card>
      
      {/* Footer */}
    </div>
  );
}

export default App;
