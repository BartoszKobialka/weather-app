import React from 'react';
import './App.css';
import SearchLocation from './components/SearchLocation/SearchLocation';
import Api from './api/Api';
import Location from './commonInterfaces/Location.interface';
import {
  GetLocationsByCoords,
  GetLocationsByName,
} from './commonInterfaces/GetLocationsParams.interface';
import ForecastCard from './components/ForecastCard/ForcastCard';
import Settings from './components/Settings/Settings';

export interface AppProps {}

export interface AppState {
  inputLocation: string;
  currentLocation: Location;
  locationsList: Location[];
  haveLocationsFound: boolean;
  isImperialUnit: boolean;
  dateList: string[];
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
      isImperialUnit: false,
      dateList: Array<string>(),
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
      dateList: Array<string>(),
    });

    localStorage.setItem('woeid', selectedLocation.woeid.toString());
  };

  handleUnitsSystemChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ isImperialUnit: event.target.checked });
  };

  handleLocationSubmit = () => {
    let dateList = Array<string>();

    for (let i = 0; i < 3; i++) {
      let currentDate = new Date(
        new Date().getTime() + i * 24 * 60 * 60 * 1000
      );
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      dateList.push(`${year}/${month}/${day}`);
    }

    this.setState({ dateList: dateList });
  };

  render() {
    return (
      <div
        style={{ overflowX: 'hidden', minHeight: '100vh' }}
        className="fluid-container"
      >
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-10 col-lg-6 d-flex justify-content-center mx-auto">
            <SearchLocation
              onLocationFieldChanged={this.handleLocationFieldChnaged}
              locationText={this.state.inputLocation}
              locationsList={this.state.locationsList}
              onLocationItemClicked={this.handleLocationItemClicked}
              haveLocationsFound={this.state.haveLocationsFound}
              onLocationSubmit={this.handleLocationSubmit}
            />
          </div>
        </div>
        <div className="row">
          {this.state.dateList.map((date) => (
            <ForecastCard
              location={this.state.currentLocation}
              date={date}
              isImperialUnit={this.state.isImperialUnit}
              key={date}
            />
          ))}
        </div>
        <Settings
          isImperialUnit={this.state.isImperialUnit}
          onUnitsSystemChanged={this.handleUnitsSystemChanged}
        />
      </div>
    );
  }
}

export default App;
