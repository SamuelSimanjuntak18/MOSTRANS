// src/integration/AssignCharacterAndCheckLocation.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route } from 'react-router-dom';
import DetailCharacter from '../pages/DetailCharacter';
import CharacterByLocation from '../pages/CharacterByLocation';
import { GET_CHARACTER_BY_ID } from '../pages/DetailCharacter';
import '@testing-library/jest-dom/extend-expect';
import Swal from 'sweetalert2';

jest.mock('sweetalert2');

const mocks = [
  {
    request: {
      query: GET_CHARACTER_BY_ID,
      variables: { id: '1' },
    },
    result: {
      data: {
        character: {
          id: '1',
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          origin: { name: 'Earth' },
          location: { name: 'Earth' },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      },
    },
  },
];

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value;
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

test('assign character and check if it appears in CharacterByLocation', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/character/1']}>
        <Route path="/character/:id" component={DetailCharacter} />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());

  fireEvent.change(screen.getByPlaceholderText('Enter location'), { target: { value: 'Citadel' } });
  fireEvent.click(screen.getByText('Assign to Location'));

  expect(Swal.fire).toHaveBeenCalledWith({
    title: 'Confirm Assignment',
    text: `Are you sure you want to assign Rick Sanchez to location "Citadel"?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, assign it!',
    cancelButtonText: 'No, cancel',
  });

  Swal.fire.mockResolvedValue({ isConfirmed: true });

  render(<CharacterByLocation />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Citadel' } });

  await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());
});
