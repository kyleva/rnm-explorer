// Constants
import { EXPLORER_API } from '../constants';
// Queries
import { getResidentByIdQuery } from './queries';
// Types
import { ResidentResponse } from './types';

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
