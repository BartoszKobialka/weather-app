import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

test('Renders search locations bar', () => {
  const app = render(<App />);
  const searchBar = app.getByPlaceholderText('Type wanted location...');
  expect(searchBar).toBeInTheDocument();
});

test('Renders settings', () => {
  const app = render(<App />);
  const settings = app.getByAltText('settings');
  expect(settings).toBeInTheDocument();
});
