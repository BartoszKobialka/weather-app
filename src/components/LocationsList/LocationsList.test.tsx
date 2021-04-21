import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LocationsList from './LocationsList';
import Location from '../../commonInterfaces/Location.interface';

const locationsTestList = require('../../__testData__/Locations.json');

test('Renders 2 items elements', () => {
  const locationsList = render(
    <LocationsList
      locationsList={locationsTestList}
      onLocationItemClicked={() => {}}
    />
  );
  const buttonsList = locationsList.baseElement.querySelectorAll('button');
  expect(buttonsList.length).toBe(2);
});

test('Renders empty', () => {
  const locationsList = render(
    <LocationsList
      locationsList={[] as Location[]}
      onLocationItemClicked={() => {}}
    />
  );
  const buttonsList = locationsList.baseElement.querySelectorAll('button');
  expect(buttonsList.length).toBe(0);
});

test('Click element', () => {
  let count = 0;

  const locationsList = render(
    <LocationsList
      locationsList={locationsTestList}
      onLocationItemClicked={() => {
        count += 1;
      }}
    />
  );

  const button = locationsList.baseElement.querySelector('button');
  fireEvent.click(button as HTMLButtonElement);

  expect(count).toBe(1);
});
