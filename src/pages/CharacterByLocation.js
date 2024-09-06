import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import { Spinner } from 'react-bootstrap';
import '../style/CharacterByLocation.css';


function CharacterByLocation() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch locations from local storage or server
    const fetchedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    setLocations(fetchedLocations);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setLoading(true);
      // Simulating API delay with setTimeout for a more realistic loading effect
      setTimeout(() => {
        const fetchedCharacters = JSON.parse(localStorage.getItem(selectedLocation)) || [];
        setCharacters(fetchedCharacters);
        setLoading(false);
      }, 1000);
    }
  }, [selectedLocation]);

  return (
    <div className="character-container my-4">
      <h1 className="text-center mb-4">Characters By Location</h1>
      
      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select w-50 custom-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map(location => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row justify-content-center">
          {characters.length === 0 && selectedLocation && (
            <p className="text-center text-muted">No characters found for this location.</p>
          )}
          {characters.map(character => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={character.id}>
              <CharacterCard character={character} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterByLocation;
