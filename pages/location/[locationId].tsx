import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Loader from '../../components/Loader';
import LocationDetails from '../../components/LocationDetails';
// Types
import { Location } from '../../api/location/types';
import { getLocationById } from '../../api/location/location';

const ResidentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation]: [
    Location,
    Dispatch<SetStateAction<Location>>
  ] = useState({} as Location);

  const router = useRouter();
  const id = router.query.locationId as string;

  useEffect(() => {
    // Don't execute side effect on first render (url prop not available)
    if (!Boolean(id)) return;

    getLocationById(id).then((response) => {
      setLocation(response.location);
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!Boolean(location.name)) return;
    document.title = `${location.name} | Rick and Morty Explorer`;
  }, [location]);

  if (isLoading) return <Loader />;

  return (
    <div className="container px-4 mx-auto my-4">
      <>
        <p className="mb-4">
          <span className="cursor-pointer" onClick={() => router.back()}>
            <a>&laquo; Back</a>
          </span>
        </p>

        <LocationDetails {...location} />
      </>
    </div>
  );
};

export default ResidentPage;
