import { Location } from '../location/types';

export type ResidentResponse = {
  character: Resident;
};

export type Resident = {
  id: string;
  gender: string;
  image: string;
  name: string;
  location: Location;
  origin: Location;
  species: string;
  status: string;
};
