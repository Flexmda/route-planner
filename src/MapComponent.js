import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';

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
  const [markers, setMarkers] = useState([]);
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    const loadGeocoder = () => {
      if (window.google && window.google.maps) {
        setGeocoder(new window.google.maps.Geocoder());
      }
    };

    loadGeocoder();
  }, []);

  useEffect(() => {
    const calculateRoute = async () => {
      const routes = showMorningRoutes ? morningRoutes : eveningRoutes;

      if (routes.length > 0 && geocoder) {
        const geocodePromises = routes.map(route => 
          new Promise((resolve, reject) => {
            geocoder.geocode({ address: route }, (results, status) => {
              if (status === 'OK') {
                resolve(results[0].geometry.location);
              } else {
                reject(`Geocode was not successful for the following reason: ${status}`);
              }
            });
          })
        );

        try {
          const locations = await Promise.all(geocodePromises);
          const origin = locations[0];
          const destination = locations[locations.length - 1];
          const waypoints = locations.slice(1, -1).map(location => ({
            location,
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

          // Set markers
          setMarkers(locations.map((location, index) => ({
            position: location,
            label: (index + 1).toString()
          })));
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (geocoder) {
      calculateRoute();
    }
  }, [morningRoutes, eveningRoutes, showMorningRoutes, geocoder]);

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
        <label className="switch">
          <input
            type="checkbox"
            checked={showMorningRoutes}
            onChange={() => setShowMorningRoutes(!showMorningRoutes)}
          />
          <span className="slider"></span>
        </label>
        <span>{showMorningRoutes ? 'Rutas de Mañana' : 'Rutas de Tarde'}</span>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
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
      </div>
    </LoadScript>
  );
}

export default MapComponent;
