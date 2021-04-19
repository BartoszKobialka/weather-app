import Location from '../../commonInterfaces/Location.interface';
import LocationItem from './LocationItem';
import './LocationList.css';

export interface LocationsListProps {
  locationsList: Location[];
  onLocationItemClicked: any;
}

const LocationsList = (props: LocationsListProps) => {
  return (
    <div className="locationList">
      {props.locationsList.map((location) => (
        <LocationItem
          key={location.woeid}
          location={location}
          onLocationItemClicked={props.onLocationItemClicked}
        />
      ))}
    </div>
  );
};

export default LocationsList;
