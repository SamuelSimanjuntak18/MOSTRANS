import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterByLocation from './CharacterByLocation';
import '@testing-library/jest-dom/extend-expect';

const mockLocalStorage = (() => {
  let store = {
    locations: JSON.stringify(['Citadel', 'Earth']),
    Citadel: JSON.stringify([{ id: '1', name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' }]),
    Earth: JSON.stringify([{ id: '2', name: 'Morty Smith', status: 'Alive', species: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' }])
  };

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

test('renders CharacterByLocation and displays locations', async () => {
  render(<CharacterByLocation />);

  expect(screen.getByText('Characters By Location')).toBeInTheDocument();
  expect(screen.getByText('Select Location')).toBeInTheDocument();

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Citadel' } });

  await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());
});

test('shows correct characters for selected location', async () => {
  render(<CharacterByLocation />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Earth' } });

  await waitFor(() => expect(screen.getByText('Morty Smith')).toBeInTheDocument());
});
