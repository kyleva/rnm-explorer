export type Location = {
  id: string;
  dimension: string;
  name: string;
  residents: Resident[];
  type: string;
};

export type LocationResponse = {
  location: Location;
};

export type LocationsResponse = {
  locations: {
    info: {
      pages: number;
    };
    results: Location[];
  };
};
