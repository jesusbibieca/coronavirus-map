import React, { useContext, useEffect }from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { readRemoteFile } from 'react-papaparse';
import { handleComplete, FILES } from './scripts/parseCSV';

import './Map.css';
import { GlobalState } from './context/GlobalState';

const MAP_FILE_URL = {
  confirmed: FILES[0],
  deaths: FILES[1],
  recovered: FILES[2]
};


function MapView() {

  const context = useContext(GlobalState);
  const position = [18.4861, -69.98857];

  console.log(context)

  useEffect(() => {
    readRemoteFile(MAP_FILE_URL[context.selectedList],
      {
        header: true,
        complete: function(res) {
          const results = handleComplete(res);
          context.loadData(results);
        }
      }
    );
  }, [context.selectedList]);



  return (
    <>
    <button onClick={(e) => {
      e.preventDefault()
      context.selectList('recovered');
    }
      }>change list</button>
    <Map center={position} zoom={4}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
    </Map>
    </>
  );
}

export default MapView;
