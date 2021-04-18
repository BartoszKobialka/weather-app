import React from 'react';
import Location from '../../commonInterfaces/Location.interface';

const LocationItem = (props: { location: Location }) => {
  return (
    <button className="badge badge-primary my-1 w-100">
      {props.location.title}
    </button>
  );
};

export default LocationItem;
