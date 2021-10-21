import { useEffect, useState } from 'react';

// Components
import Loader from './components/Loader';
import Location from './components/Location';
import Pagination from './components/Pagination';
// Helpers
import { getLocations } from './api/location/location';
// Types
import { Location as LocationType } from './api/location/types';

const Home = () => {
  const [data, setData]: [LocationType[], Function] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getLocations(page).then((response) => {
      setData(response.locations.results);
      setPageCount(response.locations.info.pages);
      setIsLoading(false);
    });
  }, [page]);

  useEffect(() => {
    document.title = 'Rick and Morty Explorer';
  });

  if (isLoading) return <Loader />;

  return (
    data.length > 0 && (
      <div className="container px-4 mx-auto my-4">
        {data.map((location) => (
          <Location {...location} />
        ))}

        <Pagination
          currentPage={page}
          pageCount={pageCount}
          setPage={(newPage) => {
            setIsLoading(true);
            setPage(newPage);
          }}
        />
      </div>
    )
  );
};

export default Home;
