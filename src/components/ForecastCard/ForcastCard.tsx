import React from 'react';
import './ForecastCard.scss';
import arrow from '../assets/arrow.png';
import Forecast from '../../commonInterfaces/Forecast.interface';
import Api from '../../api/Api';
import Location from '../../commonInterfaces/Location.interface';

export interface ForecastCardProps {
  location: Location;
  isImperialUnit: boolean;
  date: string;
}

export interface ForecastCardState {
  forecast: Forecast;
}

class ForecastCard extends React.Component<
  ForecastCardProps,
  ForecastCardState
> {
  constructor(props: ForecastCardProps) {
    super(props);
    this.state = { forecast: {} as Forecast };
  }

  componentDidMount() {
    this.getForecast(this.props.location.woeid, this.props.date);
  }

  getForecast = (woeid: number, date: string) => {
    Api.getForecast(woeid, date)
      .then((forecast) => {
        this.setState({ forecast: forecast as Forecast });
        console.log(forecast);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          forecast: {} as Forecast,
        });
      });
  };

  getTemp = (temp: number): string => {
    try {
      if (isNaN(temp)) throw Error();

      if (this.props.isImperialUnit)
        return (temp * 1.8 + 32).toFixed(1).toString() + '\xB0C';
      else return temp.toFixed(1).toString() + '\xB0C';
    } catch (e) {
      return '';
    }
  };

  getVisibility = (visibility: number): string => {
    try {
      if (isNaN(visibility)) throw Error();

      if (this.props.isImperialUnit)
        return visibility.toFixed(1).toString() + 'mi';
      else return (visibility * 1.6).toFixed(1).toString() + 'km';
    } catch (e) {
      return '';
    }
  };

  getWindSpeed = (speed: number): string => {
    try {
      if (isNaN(speed)) throw Error();

      if (this.props.isImperialUnit) return speed.toFixed(1).toString() + 'mph';
      else return (speed * 1.6).toFixed(1).toString() + 'kmh';
    } catch (e) {
      return '';
    }
  };

  render() {
    const { forecast } = this.state;

    return (
      <div className="col-10 col-sm-10 col-md-7 col-lg-7 col-xl-3 col-xxl-2 flex-wrap forecast-card mx-auto my-4 py-3">
        <div className="forecast-card-text-lg">{forecast.applicable_date}</div>
        <div className="forecast-card-text-md mt-2">
          {this.props.location.title}
        </div>
        <div className="w-100 d-flex align-content-center justify-content-center my-4">
          <div className="d-flex align-content-center">
            <div className="forecast-card-temp-default">
              {this.getTemp(forecast.the_temp)}
            </div>
            <div className="forecast-card-temp-container">
              <span>{this.getTemp(forecast.max_temp)}</span>
              <span>{this.getTemp(forecast.min_temp)}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="forecast-card-img"
              src={`https://www.metaweather.com/static/img/weather/png/64/${forecast.weather_state_abbr}.png`}
              alt="weather"
            />
          </div>
        </div>
        <div className="forecast-card-text-lg">Wind</div>
        <div className="forecast-card-wind">
          <span>{this.getWindSpeed(forecast.wind_speed)}</span>
          <div>
            <img
              style={{
                transform: `rotateZ(${Math.floor(forecast.wind_direction)}deg)`,
              }}
              src={arrow}
              alt="wind direction: NE"
            />
          </div>
        </div>
        <div className="w-100 d-flex align-content-center justify-content-center my-4">
          <div className="forecast-card-text-md mt-2">
            Visibility {this.getVisibility(forecast.visibility)}
          </div>
          <div className="forecast-card-text-md mt-2">
            Humidity {forecast.humidity}%
          </div>
        </div>
      </div>
    );
  }
}

export default ForecastCard;
