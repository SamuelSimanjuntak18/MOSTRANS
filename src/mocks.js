import { GET_CHARACTERS, GET_CHARACTER_BY_ID } from './services/api';  // Adjust the path as needed

export const mocks = [
    {
        request: {
          query: GET_CHARACTERS,
        },
        result: {
          data: {
            characters: {
              results: [
                {
                  id: '1',
                  name: 'Rick Sanchez',
                  status: 'Alive',
                  species: 'Human',
                  image: 'https://example.com/rick.png',
                },
              ],
            },
          },
        },
      },
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
              image: 'https://example.com/rick.png',
            },
          },
        },
      },
    ];