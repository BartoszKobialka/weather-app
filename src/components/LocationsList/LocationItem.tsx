import Location from '../../commonInterfaces/Location.interface';

const LocationItem = (props: {
  location: Location;
  onLocationItemClicked: any;
}) => {
  return (
    <button
      onClick={() => props.onLocationItemClicked(props.location)}
      className="btn btn-dark my-1 w-100"
    >
      {props.location.title}
    </button>
  );
};

export default LocationItem;
