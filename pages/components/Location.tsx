// Components
import LocationResident from './LocationResident';
// Types
import { Resident } from '../api/resident/types';

type LocationProps = {
  id: string;
  name: string;
  residents: Resident[];
  type: string;
};

const Location = ({ id, name, residents, type }: LocationProps) => (
  <div key={`location-${id}`} className="mt-8 lg:mt-14">
    <div className="flow-root pb-2 mb-2 border-b">
      <h2 className="float-left">{name}</h2>
      <p className="md:float-right">Location type: {type}</p>
    </div>
    {residents.length > 0 && (
      <div className="grid grid-cols-2 gap-2 mt-5 mb-10 md:grid-cols-5 md:gap-4">
        {residents.map((resident) => (
          <LocationResident {...resident} />
        ))}
      </div>
    )}
  </div>
);

export default Location;
