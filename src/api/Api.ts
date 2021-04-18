import axios, { AxiosError, AxiosInstance } from 'axios';
import env from 'react-dotenv';
import Location from '../commonInterfaces/Location.interface';

export interface ErrorResponse {
  status: number;
  message: string;
}
export interface GetLocationsParams {
  name: string;
}

export default class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: env.API_URL,
    });
  }

  public getLocations = async (
    location: GetLocationsParams
  ): Promise<Location[] | ErrorResponse> => {
    try {
      const { data } = await this.api.get<Location[]>(
        `search/?query=${location.name}`
      );

      return data;
    } catch (err) {
      return this.handleError(err);
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
