import { EXPLORER_API } from './constants';
import { Resident } from './resident';

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

export type Location = {
  id: number;
  name: string;
  residents: Resident[];
  type: string;
};

export type LocationsResponse = {
  locations: {
    info: {
      pages: number;
    };
    results: Location[];
  };
};
