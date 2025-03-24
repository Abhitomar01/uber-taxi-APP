import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const LiveTracking = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 })

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <LoadScript 
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      // Ensure this API key is valid and the Maps JavaScript API is enabled in Google Cloud Console.
    >
        
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
      >
        <Marker position={currentLocation} />
        {/* ...other components if needed... */}
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking