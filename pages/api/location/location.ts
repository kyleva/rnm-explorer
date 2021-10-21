// Constants
import { EXPLORER_API } from '../constants';
// Types
import { LocationsResponse } from './types';

const getAllLocationsQuery = `
  query GetAllLocations($page: Int) {
    locations(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        residents {
          id
          image
          name
          status
        }
        type
      }
    }
  }
`;

export const getLocations = (page: number = 1): Promise<LocationsResponse> =>
  fetch(EXPLORER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: { page },
      query: getAllLocationsQuery,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
