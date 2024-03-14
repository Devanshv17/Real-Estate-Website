
    import React, { useState, useEffect } from 'react';

    const MapPicker = () => {
      const [map, setMap] = useState(null);
      const [selectedLocation, setSelectedLocation] = useState(null);
      const [searchQuery, setSearchQuery] = useState('');
      const [searchResults, setSearchResults] = useState([]);
    
      useEffect(() => {
        const platform = new window.H.service.Platform({
          apikey: 'ksxEEWUW_s34BhnECkotRaxiCGWgbz4DQLAJCkp-vQ'
        });
    
        const defaultLayers = platform.createDefaultLayers();
        const mapContainer = document.getElementById('map');
    
        const newMap = new window.H.Map(mapContainer, defaultLayers.vector.normal.map, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
          pixelRatio: window.devicePixelRatio || 1
        });
    
        setMap(newMap);
    
        return () => {
          newMap.dispose();
        };
      }, []);
    
      const handleMapClick = (event) => {
        const { lat, lng } = map.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
        setSelectedLocation({ lat, lng });
      };
    
      const handleSelectClick = async () => {
        if (selectedLocation) {
          console.log(`Selected location: ${selectedLocation.lat}, ${selectedLocation.lng}`);
          try {
            const platform = new window.H.service.Platform({
              apikey: 'ksxEEWUW_s34BhnECkotRaxiCGWgbz4DQLAJCkp-vQ'
            });
            const service = platform.getSearchService();
            const reverseGeocodingParams = {
              at: `${selectedLocation.lat},${selectedLocation.lng}`
            };
            const reverseGeocode = await service.reverseGeocode(reverseGeocodingParams);
            console.log('Reverse geocoding result:', reverseGeocode);
          } catch (error) {
            console.error('Error occurred during reverse geocoding:', error);
          }
        } else {
          console.log("No location selected.");
        }
      };
    
      const handleSearch = async () => {
        if (searchQuery.trim() === '') return;
    
        try {
          const platform = new window.H.service.Platform({
            apikey: 'ksxEEWUW_s34BhnECkotRaxiCGWgbz4DQLAJCkp-vQ'
          });
    
          const service = platform.getSearchService();
    
          const geocodingParams = {
            q: searchQuery
          };
    
          const response = await service.geocode(geocodingParams);
          setSearchResults(response.items);
        } catch (error) {
          console.error('Error occurred during geocoding:', error);
        }
      };
    
      const handleResultClick = (result) => {
        setSelectedLocation({
          lat: result.position.lat,
          lng: result.position.lng
        });
      };
    
      return (
        <div>
          <div>
            <input
              type="text"
              placeholder="Search for a place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div id="map" style={{ width: '600px', height: '450px' }} onClick={handleMapClick}></div>
          <div>
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} onClick={() => handleResultClick(result)}>
                  {result.title}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handleSelectClick}>Select</button>
        </div>
      );
    };
    
    export default MapPicker;
    