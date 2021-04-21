import { fireEvent, render } from '@testing-library/react';
import SearchLocation from './SearchLocation';

const locationsTestList = require('../../__testData__/Locations.json');

test('Input text sets from props value', () => {
  render(
    <SearchLocation
      onLocationFieldChanged={() => {}}
      onLocationItemClicked={() => {}}
      onLocationSubmit={() => {}}
      locationText={'New York'}
      locationsList={[]}
      haveLocationsFound={false}
    />
  );
  const searchInput = document.querySelector('input');

  expect(searchInput?.value).toBe('New York');
});

test('Error alert shows', () => {
  render(
    <SearchLocation
      onLocationFieldChanged={() => {}}
      onLocationItemClicked={() => {}}
      onLocationSubmit={() => {}}
      locationText={'New York'}
      locationsList={[]}
      haveLocationsFound={false}
    />
  );
  const searchInput = document.querySelector('.alert');

  expect(searchInput).toBeInTheDocument();
});

test('Error alert do not shows when input is empty', () => {
  render(
    <SearchLocation
      onLocationFieldChanged={() => {}}
      onLocationItemClicked={() => {}}
      onLocationSubmit={() => {}}
      locationText={''}
      locationsList={[]}
      haveLocationsFound={false}
    />
  );
  const searchInput = document.querySelector('.alert');

  expect(searchInput).not.toBeInTheDocument();
});

test('Locations list shows', () => {
  render(
    <SearchLocation
      onLocationFieldChanged={() => {}}
      onLocationItemClicked={() => {}}
      onLocationSubmit={() => {}}
      locationText={'New York'}
      locationsList={locationsTestList}
      haveLocationsFound={false}
    />
  );
  const locationsList = document.querySelector('.locationList');

  expect(locationsList).toBeInTheDocument();
});
