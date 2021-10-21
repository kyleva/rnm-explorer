export type Location = {
  id: string;
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
