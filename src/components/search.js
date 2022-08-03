import AsyncSelect from 'react-select/async';
import React, {useState} from 'react';

const Search = ({onSearchChangeHandle}) => {
    const [search, setSearch] = useState(null);

    const geoBDoptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_geoDBAPIKey,
            'X-RapidAPI-Host': process.env.REACT_APP_geoDBAPIHost
        }
    };

    const loadOption = async (input)=> {
        let response = await fetch(`${process.env.REACT_APP_geoDBAPIFetch}/cities?namePrefix=${input}`, geoBDoptions).then(response => response.json())
        const options = response.data.map(city => { return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`
        }})
        return options;
    }

    const onSearchChange = (event)=> {
        setSearch(event);
        onSearchChangeHandle(event);
    }

    return (
        <div>
            <AsyncSelect id="city" placeholder="Choose a city" value={search} onChange={onSearchChange} loadOptions={loadOption} />
        </div>
      );
};

export default Search;