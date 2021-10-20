import { useEffect, useState } from 'react';

import { getLocations, Location, LocationsResponse } from './api/location';

const Home = () => {
  const [data, setData]: [Location[], Function] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  if (isLoading) return <div>Loading...</div>;

  return <div>Hello!</div>;
};

export default Home;
