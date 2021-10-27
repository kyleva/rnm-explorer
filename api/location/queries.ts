export const getAllLocationsQuery = `
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

export const getLocationByIdQuery = `
  query GetLocationById($locationId: ID!) {
    location(id: $locationId) {
      id
      dimension
      name
      residents {
          id
          image
          name
      }
      type
    }
  }
`;
