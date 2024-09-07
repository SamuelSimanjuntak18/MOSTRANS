import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Routes } from 'react-router-dom';
import { mocks } from '../__mocks__/mocks';  // Adjust the path as needed
import DetailCharacter from '../pages/DetailCharacter';  // Adjust the path as needed

test('renders character details and handles assignment', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <DetailCharacter />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );

  // Replace with your actual test assertions
  await waitFor(() => {
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
});
