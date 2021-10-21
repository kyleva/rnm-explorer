// Constants
import { EXPLORER_API } from '../constants';
// Types
import { ResidentResponse } from './types';

const getResidentByIdQuery = `
  query GetCharacterById($residentId: ID!) {
    character(id: $residentId) {
      id
      gender
      image
      name
      location {
        name
      }
      origin {
        name
      }
      species
      status
      type
    }
  }
`;

export const getResidentById = (id: string): Promise<ResidentResponse> =>
  fetch(EXPLORER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: { residentId: id },
      query: getResidentByIdQuery,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
