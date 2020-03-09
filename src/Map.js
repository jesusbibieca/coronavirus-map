import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './Map.css';


function MapView() {
  const position = [18.4861, -69.98857];

  return (
    <Map center={position} zoom={4}>
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    </Map>
  );
}

export default MapView;
