import React from 'react';
import './App.scss';
import SearchLocation from './components/SearchLocation/SearchLocation';
import Api from './api/Api';
import Location from './commonInterfaces/Location.interface';
import {
  GetLocationsByCoords,
  GetLocationsByName,
} from './commonInterfaces/GetLocationsParams.interface';
import ForecastCard from './components/ForecastCard/ForcastCard';
import Settings from './components/Settings/Settings';
import MakeDataList from './Utils/MakeDataList';

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
      locationsList: Array<Location>(),
      currentLocation: {} as Location,
      haveLocationsFound: true,
      isImperialUnit: false,
      dateList: Array<string>(),
    };
  }

  componentDidMount() {
    const localStoredLocation = localStorage.getItem('lastLocation');
    if (localStoredLocation === null) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.getLocationsList({ lattlong: `${latitude},${longitude}` });
      });
    } else {
      this.setState({
        currentLocation: JSON.parse(localStoredLocation as string),
        dateList: Array<string>(),
      });
      this.fillDateList();
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

    localStorage.setItem('lastLocation', JSON.stringify(selectedLocation));
    this.fillDateList();
  };

  handleUnitsSystemChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ isImperialUnit: event.target.checked });
  };

  fillDateList = () => {
    this.setState({ dateList: MakeDataList() });
  };

  handleLocationSubmit = () => {
    this.fillDateList();
  };

  render() {
    return (
      <div className="fluid-container App">
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
