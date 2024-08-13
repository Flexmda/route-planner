import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Estilo del contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '400px'
};

// Centro del mapa
const center = {
  lat: -3.745,
  lng: -38.523
};

// Componente del mapa
const MapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDcSZ2P9SYCjQeQxEmbY2VfiJIO2bUII6s" // Tu clave API aquí
      id="script-loader"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
