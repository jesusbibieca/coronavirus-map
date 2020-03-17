import React, { useContext, useEffect, useState } from 'react';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Search from 'react-leaflet-search';
import { readRemoteFile } from 'react-papaparse';

import { handleComplete, FILES } from './scripts/parseCSV';

import LocateControl from './LocateControl';

import './Map.css';
import { GlobalState } from './context/GlobalState';

const MAP_FILE_URL = {
  confirmed: FILES[0],
  deaths: FILES[1],
  recovered: FILES[2]
};

const locateOptions = {
  position: 'topleft',
  strings: {
      title: 'Live Location'
  },
  flyTo: true,
  startDirectly: true,
};


function MapView() {

  const context = useContext(GlobalState);
  const { listData, loaded } = context;
  const position = context.center;
  const [ zoomLevel, setZoomLevel ] = useState(5);

  const calculateReports = (data) => {
    let min = Infinity;
    let max = 0;
    data.map((element) => {
      const count = Number(element.reportedCount);
      if (count < min && count !== 0) {
        min = count;
      }
      if (count > max) {
        max = count;
      }
    });
    return [min, max];
  };
  
  const [ minReport, maxReport ] = loaded ? calculateReports(listData[context.selectedList]) : [];
  
  useEffect(() => {
    readRemoteFile(MAP_FILE_URL['confirmed'],
      {
        header: true,
        complete: function(res) {
          const results = handleComplete(res);
          context.loadConfirmed(results);
        }
      }
    );

    readRemoteFile(MAP_FILE_URL['deaths'],
      {
        header: true,
        complete: function(res) {
          const results = handleComplete(res);
          context.loadDeath(results);
        }
      }
    );

    readRemoteFile(MAP_FILE_URL['recovered'],
      {
        header: true,
        complete: function(res) {
          const results = handleComplete(res);
          context.loadRecovered(results);
        }
      }
    );

    context.hasLoaded();
  }, []);
  
  console.log(context.listData);

  

  const handleZoom = (e) => {
    setZoomLevel(e.target._zoom);
  };

  // const getLocation = () => {
  //   function success(data) {
  //     const { coords } = data;
  //     context.setCenter([coords.latitude, coords.longitude]);
  //     setZoomLevel(8);
  //   }
    
  //   navigator.geolocation.getCurrentPosition(success, console.error);
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  return (
  <>
    <div className='map-title'>Tracking CoronaVirus</div>
    <Map onZoomEnd={handleZoom} center={position} zoom={zoomLevel}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Search 
        inputPlaceholder='Search city or country...'
        zoom={8}
        position='topright'
        showMarker={false}
        showPopup={false}
        openSearchOnLoad={true}
        closeResultsOnClick={true}
      />

      <LocateControl options={locateOptions}> 
        <MyLocationIcon />
      </LocateControl>

       {loaded && listData[context.selectedList] &&
         listData[context.selectedList].map((value, index) => {
           const {country, state, reportedCount, latitude, longitude } = value;
           if (latitude && longitude && reportedCount > 0) {
            const markerRadius = mapRange(reportedCount, minReport, maxReport, 10, 150);
             return <OccurrenceMarker key={state + index} popupData={{ country, state, reportedCount }} center={[parseFloat(latitude, 10), parseFloat(longitude, 10)]} radius={markerRadius} />;
           } else {
             return null;
           }
        })
       }
    </Map>
    </>
  );
}


function OccurrenceMarker({center, radius, popupData }) {
  return (
    <CircleMarker center={center} color="red" radius={radius}>
      <Popup>
        {popupData.country} {popupData.country && popupData.state ? ` - ${popupData.state}` : popupData.state}
        <br/>
        {'Reports: ' + Intl.NumberFormat().format(popupData.reportedCount)}
      </Popup>
    </CircleMarker>
  );
}


// linearly maps value from the range (a..b) to (c..d)
// reference: https://github.com/processing/p5.js/blob/master/src/math/calculation.js#L459
function mapRange (value, a, b, c, d) {
  // first map value from (a..b) to (0..1)
  value = (value - a) / (b - a);
  // then map it from (0..1) to (c..d) and return it
  return c + value * (d - c);
}

export default MapView;
