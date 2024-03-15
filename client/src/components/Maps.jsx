import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import customMarkerIcon from '../images/custom-marker-icon.png'; // Import your custom marker icon image

const MapPicker = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView([0, 0], 2); // Initial center and zoom

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=oxVbuDW4q7UOmOIBZMv5', {
      attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
    }).addTo(mapInstance);

    const geocoderInstance = L.Control.geocoder({
      defaultMarkGeocode: false,
      expand: true, // Expand the control by default
      collapsed: false, // Don't collapse the control initially
    }).addTo(mapInstance);

    geocoderInstance.on('markgeocode', function (e) {
      const latlng = e.geocode.center;
      setSelectedLocation(latlng);
      mapInstance.setView(latlng, 10); // Zoom to the selected location

      onLocationSelect(latlng);

      // Update marker position when a location is selected
      if (marker) {
        marker.setLatLng(latlng);
      }
    });

    setMap(mapInstance);
    setGeocoder(geocoderInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    // Remove existing marker if any
    if (marker) {
      map.removeLayer(marker);
    }
    // Add marker for selected location
    if (selectedLocation) {
      const customIcon = L.icon({
        iconUrl: customMarkerIcon, // Path to your custom marker icon
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon (center bottom)
      });

      // Make the marker draggable
      const newMarker = L.marker(selectedLocation, { icon: customIcon, draggable: true }).addTo(map);
      newMarker.on('dragend', function(event) {
        const newPosition = event.target.getLatLng();
        onLocationSelect(newPosition);
      });
      setMarker(newMarker);
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col items-center">
      <div id="map" className="w-full h-96" />

    </div>
  );
};

export default MapPicker;
