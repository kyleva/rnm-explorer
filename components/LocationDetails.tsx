// Components
import LocationResident from './LocationResident';
// Types
import { Location } from '../api/location/types';

const LocationDetails = ({ dimension, name, residents, type }: Location) => (
  <>
    <h1 className="mb-6 text-lg">{name}</h1>

    <p className="mb-2">
      <strong>Type:</strong> {type}
    </p>

    <p className="mb-2">
      <strong>Dimension:</strong> {dimension}
    </p>

    <p className="mb-2">
      <strong>Residents:</strong>
    </p>

    <div className="grid grid-cols-2 gap-2 mt-5 mb-10 lg:grid-cols-4 lg:gap-4">
      {residents.length === 0 && (
        <div>
          <p>{"There's no one here"}</p>
        </div>
      )}
      {residents.length > 0 &&
        residents.map((resident) => (
          <LocationResident
            key={`location-resident-${resident.id}`}
            {...resident}
          />
        ))}
    </div>
  </>
);

export default LocationDetails;
