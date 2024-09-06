import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import { Spinner, Alert, Container } from 'react-bootstrap';
import '../style/CharactersList.css'; 

function CharactersList() {
    const { loading, error, data } = useQuery(GET_CHARACTERS);
  
    if (loading) return (
      <div className="loading-container">
        <Spinner animation="grow" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  
    if (error) return (
      <Container className="error-container">
        <Alert variant="danger">
          <Alert.Heading>Something went wrong!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      </Container>
    );
  
    return (
      <Container fluid className="characters-list">
        <h1 className="text-light text-center mb-4"> Characters List</h1>
        <div className="character-carousel">
          {data.characters.results.map(character => (
            <Link to={`/character/${character.id}`} className="character-link" key={character.id}>
              <CharacterCard character={character} />
            </Link>
          ))}
        </div>
      </Container>
    );
  }
  
  export default CharactersList;
