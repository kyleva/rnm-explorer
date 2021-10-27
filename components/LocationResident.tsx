import Link from 'next/link';

// Components
import MediaObject from './MediaObject';
// Types
import { Resident } from '../api/resident/types';

const LocationResident = ({ id, image, name, status }: Resident) => {
  return (
    <Link
      key={`resident-${id}`}
      as={`/resident/${id}`}
      href={{
        pathname: '/resident/[residentId]',
        query: {
          id,
        },
      }}
    >
      <a>
        <MediaObject
          alt={name}
          body={
            <p className="text-sm sm:text-sm">
              {name}
              <br />
              <span className="capitalize">{status}</span>
            </p>
          }
          className="cursor-pointer"
          height="60"
          image={image}
          imageClassName="mr-2"
          width="60"
        />
      </a>
    </Link>
  );
};

export default LocationResident;
