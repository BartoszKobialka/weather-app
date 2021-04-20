import React from 'react';
import './ForecastCard.scss';
import arrow from '../../assets/arrow.png';
import Forecast from '../../commonInterfaces/Forecast.interface';
import Api from '../../api/Api';
import Location from '../../commonInterfaces/Location.interface';
import ForecastParser from '../../Utils/ForecastParser';

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
  public forecastParser: ForecastParser;

  constructor(props: ForecastCardProps) {
    super(props);
    this.state = { forecast: {} as Forecast };
    this.forecastParser = new ForecastParser(this.props.isImperialUnit);
  }

  componentDidMount() {
    this.getForecast(this.props.location.woeid, this.props.date);
  }

  componentDidUpdate() {
    this.forecastParser = new ForecastParser(this.props.isImperialUnit);
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
              {this.forecastParser.getTemp(forecast.the_temp)}
            </div>
            <div className="forecast-card-temp-container">
              <span>{this.forecastParser.getTemp(forecast.max_temp)}</span>
              <span>{this.forecastParser.getTemp(forecast.min_temp)}</span>
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
          <span>{this.forecastParser.getWindSpeed(forecast.wind_speed)}</span>
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
            Visibility {this.forecastParser.getVisibility(forecast.visibility)}
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
