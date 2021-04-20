export default class ForecastParser {
  private isImperial: boolean;

  constructor(isImperialUnit: boolean) {
    this.isImperial = isImperialUnit;
  }

  getTemp = (temp: number): string => {
    try {
      if (isNaN(temp)) throw Error();

      if (this.isImperial)
        return (temp * 1.8 + 32).toFixed(1).toString() + '\xB0F';
      else return temp.toFixed(1).toString() + '\xB0C';
    } catch (e) {
      return '';
    }
  };

  getVisibility = (visibility: number): string => {
    try {
      if (isNaN(visibility)) throw Error();

      if (this.isImperial)
        return (visibility * 1.6).toFixed(1).toString() + 'mi';
      else return visibility.toFixed(1).toString() + 'km';
    } catch (e) {
      return '';
    }
  };

  getWindSpeed = (speed: number): string => {
    try {
      if (isNaN(speed)) throw Error();

      if (this.isImperial) return (speed * 1.6).toFixed(1).toString() + 'mph';
      else return speed.toFixed(1).toString() + 'kmh';
    } catch (e) {
      return '';
    }
  };
}
