export const getResidentByIdQuery = `
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
