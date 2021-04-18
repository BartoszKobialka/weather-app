import React from 'react';
import './App.css';
import SearchLocation from './components/SearchLocation/SearchLocation';
import Api from './api/Api';
import Location from './commonInterfaces/Location.interface';

export interface AppProps {}

export interface AppState {
  location: string;
  locationsList: Location[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { location: '', locationsList: Array<Location>() };
  }

  getLocations = () => {
    const api = new Api();
    api
      .getLocations({ name: this.state.location })
      .then((locations) => {
        this.setState({ locationsList: locations as Location[] });
        console.log(locations);
      })
      .catch((error) => console.log(error));
  };

  handleLocationFieldChnaged = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      location: event.currentTarget.value,
    });
    this.getLocations();
  };

  render() {
    return (
      <div className="fluid-container">
        <div className="row">
          <div className="col col-md-12 d-flex justify-content-center">
            <SearchLocation
              onLocationFieldChanged={this.handleLocationFieldChnaged}
              locationText={this.state.location}
              locationsList={this.state.locationsList}
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
