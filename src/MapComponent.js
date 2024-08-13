import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

// Configuración del mapa
const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

// Tu clave de API
const API_KEY = 'AIzaSyDcSZ2P9SYCjQeQxEmbY2VfiJIO2bUII6s';

// Función para convertir una dirección en coordenadas
const geocodeAddress = async (address) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
  const data = await response.json();
  
  if (data.status === 'OK') {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } else {
    throw new Error(`Geocode error: ${data.status}`);
  }
};

const MapComponent = ({ morningAddresses, eveningAddresses }) => {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [showMorningRoutes, setShowMorningRoutes] = useState(true);
  const [markers, setMarkers] = useState([]);

  const fetchMarkers = async () => {
    try {
      const addressesToGeocode = showMorningRoutes ? morningAddresses : eveningAddresses;
      const newMarkers = await Promise.all(addressesToGeocode.map(async (address) => {
        const { lat, lng } = await geocodeAddress(address);
        return { position: { lat, lng }, label: address };
      }));
      setMarkers(newMarkers);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  useEffect(() => {
    if (map) {
      fetchMarkers();
    }
  }, [map, showMorningRoutes]);

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={showMorningRoutes} onChange={() => setShowMorningRoutes(!showMorningRoutes)} />
        <span className="slider"></span>
      </label>
      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={map => setMap(map)}
        >
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              label={marker.label}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
