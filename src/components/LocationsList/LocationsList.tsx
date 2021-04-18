import React from 'react';
import Location from '../../commonInterfaces/Location.interface';
import LocationItem from './LocationItem';

export interface LocationsListProps {
  locationsList: Location[];
}

const LocationsList = (props: LocationsListProps) => {
  return (
    <div>
      {props.locationsList.map((location) => (
        <LocationItem key={location.woeid} location={location} />
      ))}
    </div>
  );
};

export default LocationsList;
