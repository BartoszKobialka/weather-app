import axios, { AxiosError, AxiosInstance } from 'axios';
import Location from '../commonInterfaces/Location.interface';
import {
  GetLocationsByCoords,
  GetLocationsByName,
} from '../commonInterfaces/GetLocationsParams.interface';
import Forecast from '../commonInterfaces/Forecast.interface';

export interface ErrorResponse {
  status: number;
  message: string;
}

class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://www.metaweather.com/api/location/',
    });
  }

  public getLocations = async (
    location: GetLocationsByCoords | GetLocationsByName
  ): Promise<Location[] | Error> => {
    try {
      const { data } = await this.api.get<Location[]>(`search/`, {
        params: location,
      });

      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(this.handleError(err));
    }
  };

  public getForecast = async (
    woeid: number,
    date: string
  ): Promise<Forecast | Error> => {
    try {
      const { data } = await this.api.get<Forecast[]>(
        `location/${woeid}/${date}`
      );
      if (data.length === 0)
        Promise.reject({ status: 0, message: 'Empty data' });

      return Promise.resolve(data[0]);
    } catch (err) {
      return Promise.reject(this.handleError(err));
    }
  };

  handleError(e: AxiosError): ErrorResponse {
    let error: ErrorResponse = {
      status: 0,
      message: '',
    };
    if (e.response) {
      error.message = 'Not fount, forbiden, etc.';
      error.status = 400;
    } else if (e.request) {
      error.message = 'Some trouble on server side.';
      error.status = 500;
    } else {
      error.message = e.message;
      error.status = 0;
    }

    return error;
  }
}

export default new Api();
