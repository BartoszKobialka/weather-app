import './SearchLocation.scss';
import Location from '../../commonInterfaces/Location.interface';
import LocationsList from '../LocationsList/LocationsList';

export interface SearchLocationProps {
  onLocationFieldChanged: any;
  locationText: string;
  locationsList: Location[];
  onLocationItemClicked: any;
  haveLocationsFound: boolean;
  onLocationSubmit: any;
}

const SearchLocation = (props: SearchLocationProps) => {
  return (
    <div className="m-3 w-100 d-flex justify-content-center flex-column search-container">
      <div className="input-group w-100">
        <input
          type="text"
          value={props.locationText}
          onChange={props.onLocationFieldChanged}
          className="form-control"
          placeholder="Type wanted location..."
        />
        {/* <button
          onClick={() => props.onLocationSubmit()}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Show weather
        </button> */}
      </div>
      {!props.haveLocationsFound && props.locationText !== '' && (
        <div className="my-2 alert alert-danger" role="alert">
          Can't find this location.
        </div>
      )}
      {props.locationsList.length === 0 ? null : (
        <LocationsList
          onLocationItemClicked={props.onLocationItemClicked}
          locationsList={props.locationsList}
        />
      )}
    </div>
  );
};

export default SearchLocation;
