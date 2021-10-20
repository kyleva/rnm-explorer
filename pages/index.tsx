import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getLocations, Location, LocationsResponse } from './api/location';
import { slugify } from './api/utilities';

import MediaObject from './components/MediaObject/MediaObject';

const Home = () => {
  const [data, setData]: [Location[], Function] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getLocations(page).then((response) => {
      setData(response.locations.results);
      setIsLoading(false);
    });
  }, [page]);

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    data.length > 0 && (
      <div className="container mx-auto mt-4">
        {data.map((location) => (
          <div key={`location-${location.id}`} className="mt-4">
            <div className="flow-root pb-2 mb-2 border-b">
              <h2 className="float-left">{location.name}</h2>
              <p className="float-right">Location type: {location.type}</p>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-5 mb-10">
              {location.residents.map((resident) => (
                <Link
                  href={{
                    pathname: '/resident/[id]/[name]',
                    query: {
                      id: resident.id,
                      name: slugify(resident.name),
                    },
                  }}
                >
                  <MediaObject
                    key={`resident-${resident.id}`}
                    body={
                      <p className="text-xs">
                        {resident.name}
                        <br />
                        <span className="capitalize">{resident.status}</span>
                      </p>
                    }
                    image={resident.image}
                    imageClassName="w-6 mr-2"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Home;
