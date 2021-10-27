// Constants
import { EXPLORER_API } from '../constants';
// Queries
import { getAllLocationsQuery, getLocationByIdQuery } from './queries';
// Types
import { LocationsResponse } from './types';

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

export const getLocationById = (id: string): Promise<LocationResponse> =>
  fetch(EXPLORER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: { locationId: id },
      query: getLocationByIdQuery,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
