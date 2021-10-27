// Constants
import { EXPLORER_API } from '../constants';
// Types
import { Location } from '../location/types';
import { Resident } from '../resident/types';

type LocationsAndResidentsResponse = {
  characters: {
    results: Resident[];
  };
  locations: {
    results: Location[];
  };
};

const getAllLocationsAndResidentsQuery = `
  query GetAllLocations($searchQuery: String) {
    characters(filter: { name: $searchQuery }) {
      results {
        id
        name
      }
    }
    locations(filter: { name: $searchQuery }) {
      results {
        id
        name
      }
    }
  }
`;

export const getLocationsAndResidentsByName = (
  searchQuery: string
): Promise<LocationsAndResidentsResponse> =>
  fetch(EXPLORER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: { searchQuery },
      query: getAllLocationsAndResidentsQuery,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
