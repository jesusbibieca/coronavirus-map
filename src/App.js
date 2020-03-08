import React from 'react';
import { readRemoteFile } from 'react-papaparse'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css';

import { handleComplete, FILES } from './scripts/parseCSV';

function App() {
  const position = [18.4861, -69.98857]

  readRemoteFile(FILES[0],
    {
      header: true,
      complete: function(res) {
        const results = handleComplete(res); //send to state somehow
      }
    });

  return (
    <Map center={position} zoom={7}>
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    </Map>
  );
}

export default App;
