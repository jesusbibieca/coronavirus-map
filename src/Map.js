import React, { useContext, useEffect } from 'react';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';
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
  const { listData, loaded, selectedList } = context;
  const position = [18.4861, -69.98857];


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
  }, [selectedList]);

  return (
    <Map center={position} zoom={4}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
       {loaded && 
         listData.map((value, index) => {
           const {country, state, reportedCount, latitude, longitude } = value;
           if (latitude && longitude && reportedCount > 0) {
             return <OccurrenceMarker key={state + index} popupData={{ country, state, reportedCount }} center={[parseFloat(latitude, 10), parseFloat(longitude, 10)]} radius={20} />;
           } else {
             return null;
           }
        })
       }
    </Map>
  );
}


function OccurrenceMarker({center, radius, popupData }) {
  return (
    <CircleMarker center={center} color="red" radius={radius}>
      <Popup>{`${popupData.country}`}</Popup>
    </CircleMarker>
  );
}

export default MapView;
