import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapComponent = ({ morningRoutes, eveningRoutes }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [showMorningRoutes, setShowMorningRoutes] = useState(true);

  useEffect(() => {
    // Verificar si el objeto `google` está disponible
    console.log('Google object:', window.google);

    const calculateRoute = () => {
      const routes = showMorningRoutes ? morningRoutes : eveningRoutes;

      if (routes.length > 0) {
        const origin = routes[0];
        const destination = routes[routes.length - 1];
        const waypoints = routes.slice(1, -1).map(route => ({
          location: route,
          stopover: true
        }));

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirectionsResponse(result);
            } else {
              console.error(`Error fetching directions: ${result}`);
            }
          }
        );
      }
    };

    if (window.google && window.google.maps) {
      calculateRoute();
    } else {
      // Manejo del caso cuando la API de Google Maps no se ha cargado aún
      console.error('Google Maps API is not loaded');
    }
  }, [morningRoutes, eveningRoutes, showMorningRoutes]);

  const onLoad = (map) => {
    console.log('Google Maps API loaded:', window.google);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDcSZ2P9SYCjQeQxEmbY2VfiJIO2bUII6s" // Tu clave API aquí
      libraries={['places']}
      onLoad={onLoad}
    >
      <div>
        <label>
          <input
            type="checkbox"
            checked={showMorningRoutes}
            onChange={() => setShowMorningRoutes(!showMorningRoutes)}
          />
          {showMorningRoutes ? 'Rutas de Mañana' : 'Rutas de Tarde'}
        </label>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default MapComponent;
