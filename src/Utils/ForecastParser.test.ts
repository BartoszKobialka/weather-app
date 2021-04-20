import ForecastParser from './ForecastParser';

test('getTemp in metrics unit', () => {
  const parser = new ForecastParser(false);
  const tempValue = 5;
  const returnedValue = parser.getTemp(tempValue);

  expect(returnedValue).toMatch('5.0\xB0C');
});

test('getTemp in imperial unit', () => {
  const parser = new ForecastParser(true);
  const tempValue = 5;
  const returnedValue = parser.getTemp(tempValue);

  expect(returnedValue).toMatch('41.0\xB0F');
});

test('getVisibility in metrics unit', () => {
  const parser = new ForecastParser(false);
  const visibilityValue = 5.5;
  const returnedValue = parser.getVisibility(visibilityValue);

  expect(returnedValue).toMatch('5.5km');
});

test('getVisibility in imperial unit', () => {
  const parser = new ForecastParser(true);
  const visibilityValue = 5.6;
  const returnedValue = parser.getVisibility(visibilityValue);

  expect(returnedValue).toMatch('9.0mi');
});

test('getWindSpeed in metrics unit', () => {
  const parser = new ForecastParser(false);
  const speedValue = 5.5;
  const returnedValue = parser.getWindSpeed(speedValue);

  expect(returnedValue).toMatch('5.5kmh');
});

test('getWindSpeed in imperial unit', () => {
  const parser = new ForecastParser(true);
  const speedValue = 5.6;
  const returnedValue = parser.getWindSpeed(speedValue);

  expect(returnedValue).toMatch('9.0mph');
});
