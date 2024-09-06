import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import CharacterCard from '../components/CharacterCard';
import { Spinner, Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const GET_CHARACTER_BY_ID = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;

function DetailCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  const handleAssign = () => {
    Swal.fire({
      title: 'Confirm Assignment',
      text: `Are you sure you want to assign ${data.character.name} to location "${location}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, assign it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const locations = JSON.parse(localStorage.getItem('locations')) || [];
        if (!locations.includes(location)) {
          locations.push(location);
          localStorage.setItem('locations', JSON.stringify(locations));
        }

        const existingCharacters = JSON.parse(localStorage.getItem(location)) || [];
        const updatedCharacters = [...existingCharacters, data.character];
        localStorage.setItem(location, JSON.stringify(updatedCharacters));

        Swal.fire({
          title: 'Assigned!',
          text: `Character has been assigned to ${location}`,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setLocation('');
      }
    });
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="grow" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Alert variant="danger">
        <Alert.Heading>Error Occurred!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    </Container>
  );

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Character Details</h1>
      <Row>
        <Col xs={12} md={6} className="offset-md-3">
          <CharacterCard character={data.character} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} md={6} className="offset-md-3">
          <Form>
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label>Assign Character to Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleAssign} disabled={!location}>
                Assign to Location
              </Button>
              <Button
                variant="info"
                onClick={() => navigate('/location')}
              >
                Go to List
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailCharacter;
