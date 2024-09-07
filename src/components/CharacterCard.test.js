import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCard from './CharacterCard';

test('renders character name and status', () => {
  const character = {
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  };

  render(<CharacterCard character={character} />);

  // Mengecek apakah nama karakter muncul
  expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  
  // Mengecek apakah status karakter muncul
  expect(screen.getByText('Status: Alive')).toBeInTheDocument();
});
