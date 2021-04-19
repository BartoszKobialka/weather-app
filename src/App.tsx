import React from 'react';
import './App.css';
import SearchLocation from './components/SearchLocation/SearchLocation';
import Api from './api/Api';
import Location from './commonInterfaces/Location.interface';
import {
  GetLocationsByCoords,
  GetLocationsByName,
} from './commonInterfaces/GetLocationsParams.interface';

export interface AppProps {}

export interface AppState {
  inputLocation: string;
  currentLocation: Location;
  locationsList: Location[];
  haveLocationsFound: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      inputLocation: '',
      locationsList: Array<Location>({
        title: 'San Francisco',
        location_type: 'City',
        woeid: 2487956,
        latt_long: '37.777119, -122.41964',
      }),
      currentLocation: {} as Location,
      haveLocationsFound: true,
    };
  }

  componentDidMount() {
    const localStoredLocation = localStorage.getItem('woeid');
    if (localStoredLocation === null) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.getLocationsList({ lattlong: `${latitude},${longitude}` });
      });
    } else {
      // TODO: GET WEATHER
    }
  }

  getLocationsList = (location: GetLocationsByCoords | GetLocationsByName) => {
    Api.getLocations(location)
      .then((locations) => {
        this.setState({ locationsList: locations as Location[] });
        console.log(locations);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          haveLocationsFound: false,
          locationsList: Array<Location>(),
        });
      });
  };

  handleLocationFieldChnaged = (event: React.FormEvent<HTMLInputElement>) => {
    const typedLocation = event.currentTarget.value;
    this.setState({
      inputLocation: typedLocation,
    });
    if (this.state.currentLocation.title !== typedLocation)
      this.getLocationsList({ query: typedLocation });
  };

  handleLocationItemClicked = (location: Location) => {
    const selectedLocation = { ...location };
    this.setState({
      currentLocation: selectedLocation,
      locationsList: Array<Location>(),
      inputLocation: selectedLocation.title,
    });

    localStorage.setItem('woeid', selectedLocation.woeid.toString());
  };

  render() {
    return (
      <div className="fluid-container">
        <div className="row">
          <div className="col col-md-12 d-flex justify-content-center">
            <SearchLocation
              onLocationFieldChanged={this.handleLocationFieldChnaged}
              locationText={this.state.inputLocation}
              locationsList={this.state.locationsList}
              onLocationItemClicked={this.handleLocationItemClicked}
              haveLocationsFound={this.state.haveLocationsFound}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12 d-flex justify-content-center">
            <h2>Some weather cards...</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
