import React from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import './App.css';


function App() {
  return (
    <div className="app">
      <h1>COVID 19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="abc"
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Option One</MenuItem>
          <MenuItem value="worldwide">Option Two</MenuItem>
        </Select>
      </FormControl>
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
