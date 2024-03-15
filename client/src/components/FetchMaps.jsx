import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from '../images/custom-marker-icon.png';

const FetchMap = ({ location }) => {
  useEffect(() => {
    if (location) {
      const { lat, lng } = location;

      const map = L.map('static-map').setView([lat, lng], 13); // Set initial center and zoom

      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=oxVbuDW4q7UOmOIBZMv5', {
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: customMarkerIcon, // Path to your custom marker icon
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon (center bottom)
      });

      L.marker([lat, lng], { icon: customIcon }).addTo(map);
    }
  }, [location]);

  return( 
    <div className='my-7'>
    <h1 className='text-center font-semibold text-2xl'>Geographic Location of the Property</h1>
    <div id="static-map" style={{ width: '533px', height: '300px' }} />
    </div>
    );
};

export default FetchMap;
