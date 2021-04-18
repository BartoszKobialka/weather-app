import React from 'react';
import './SearchLocation.css';
import Location from '../../commonInterfaces/Location.interface';
import LocationsList from '../LocationsList/LocationsList';

export interface SearchLocationProps {
  onLocationFieldChanged: any;
  locationText: string;
  locationsList: Location[];
}

const SearchLocation = (props: SearchLocationProps) => {
  return (
    <div className="m-3 w-100 d-flex justify-content-center flex-column">
      <div className="input-group w-100">
        <input
          type="text"
          value={props.locationText}
          onChange={props.onLocationFieldChanged}
          className="form-control"
          placeholder="Type wanted location..."
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Show weather
        </button>
      </div>
      <LocationsList
        locationsList={[
          {
            title: 'Warsaw',
            location_type: 'City',
            woeid: 523920,
            latt_long: '52.235352,21.009390',
          },
          {
            title: 'Newark',
            location_type: 'City',
            woeid: 2459269,
            latt_long: '40.731972,-74.174179',
          },
        ]}
      />
    </div>
  );
};

export default SearchLocation;
