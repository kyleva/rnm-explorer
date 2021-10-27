import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { DATA_GROUPS } from '../api/constants';
import { getLocationsAndResidentsByName } from '../api/shared/shared';

const Typeahead = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (!Boolean(searchQuery)) return;

    getLocationsAndResidentsByName(searchQuery).then(
      ({ characters: residents, locations }) => {
        if (!Boolean(residents) || !Boolean(locations)) return;

        const residentsWithGroupLabel = residents.results.map((resident) => ({
          ...resident,
          groupLabel: DATA_GROUPS.RESIDENT,
        }));
        const locationsWithGroupLabel = locations.results.map((location) => ({
          ...location,
          groupLabel: DATA_GROUPS.LOCATION,
        }));
        setSearchResults([
          ...residentsWithGroupLabel,
          ...locationsWithGroupLabel,
        ]);
      }
    );
  }, [searchQuery]);

  return (
    <div className="container pb-8 mx-auto mt-8 mb-4 border-b">
      <Autocomplete
        onChange={(event, { groupLabel, id }) => {
          event.preventDefault();

          const route = `${groupLabel.toLowerCase()}/${id}`;
          router.push(route);
        }}
        onInputChange={(e: SyntheticEvent<HTMLFormElement>) => {
          setSearchQuery(e.currentTarget.value);
        }}
        options={searchResults}
        groupBy={(option) => option.groupLabel}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            className="w-full"
            label="Please enter a location or resident name.."
          />
        )}
      />
    </div>
  );
};

export default Typeahead;
