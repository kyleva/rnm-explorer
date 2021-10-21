import Link from 'next/link';

// Components
import MediaObject from './MediaObject';
// Helpers
import { slugify } from '../api/utilities';
// Types
import { Resident } from '../api/resident/types';

const LocationResident = ({ id, image, name, status }: Resident) => {
  const nameSlug = slugify(name);

  return (
    <Link
      key={`resident-${id}`}
      as={`/resident/${id}/${nameSlug}`}
      href={{
        pathname: '/resident/[id]/[name]',
        query: {
          id,
          name: nameSlug,
        },
      }}
    >
      <a>
        <MediaObject
          body={
            <p className="text-xs">
              {name}
              <br />
              <span className="capitalize">{status}</span>
            </p>
          }
          className="cursor-pointer"
          image={image}
          imageClassName="w-6 mr-2"
        />
      </a>
    </Link>
  );
};

export default LocationResident;
