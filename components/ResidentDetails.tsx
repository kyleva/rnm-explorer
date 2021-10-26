import Image from 'next/image';

// Types
import { Resident } from '../api/resident/types';

const ResidentDetails = ({
  gender,
  image,
  location,
  name,
  origin,
  species,
  status,
}: Resident) => (
  <>
    <div className="md:float-right">
      <Image
        alt={name}
        src={image}
        className="max-w-full"
        height="200"
        width="200"
      />
    </div>

    <h1 className="mb-6 text-lg">{name}</h1>

    <p className="mb-2">
      <strong>Status:</strong> {status}
    </p>

    <p className="mb-2">
      <strong>Species:</strong> {species}
    </p>

    <p className="mb-2">
      <strong>Gender:</strong> {gender}
    </p>

    <p className="mb-2">
      <strong>Last known location:</strong> {location.name}
    </p>

    <p className="mb-2">
      <strong>Birth location:</strong> {origin.name}
    </p>
  </>
);

export default ResidentDetails;
