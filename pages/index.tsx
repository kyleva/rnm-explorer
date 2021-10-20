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
      setPageCount(response.locations.info.pages);
      setIsLoading(false);
    });
  }, [page]);

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    data.length > 0 && (
      <div className="container px-4 mx-auto my-4">
        {data.map((location) => (
          <div key={`location-${location.id}`} className="mt-8 lg:mt-14">
            <div className="flow-root pb-2 mb-2 border-b">
              <h2 className="float-left">{location.name}</h2>
              <p className="float-right">Location type: {location.type}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5 mb-10 md:grid-cols-5 md:gap-4">
              {location.residents.map((resident) => (
                <Link
                  key={`resident-${resident.id}`}
                  href={{
                    pathname: '/resident/[id]/[name]',
                    query: {
                      id: resident.id,
                      name: slugify(resident.name),
                    },
                  }}
                >
                  <a>
                    <MediaObject
                      body={
                        <p className="text-xs">
                          {resident.name}
                          <br />
                          <span className="capitalize">{resident.status}</span>
                        </p>
                      }
                      className="cursor-pointer"
                      image={resident.image}
                      imageClassName="w-6 mr-2"
                    />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="text-center">
          {Array.from(Array(pageCount)).map((p, i) => {
            const actualPageNumber = i + 1;
            const pageItem =
              page === actualPageNumber ? (
                <button className="px-3 py-1 bg-gray-300 border rounded">
                  {actualPageNumber}
                </button>
              ) : (
                <span>
                  {' '}
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() => {
                      setIsLoading(true);
                      setPage(actualPageNumber);
                    }}
                  >
                    {actualPageNumber}
                  </button>{' '}
                </span>
              );

            return pageItem;
          })}
        </div>
      </div>
    )
  );
};

export default Home;
