import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Settings from './Settings';

test('Render settings', () => {
  const settings = render(
    <Settings isImperialUnit={false} onUnitsSystemChanged={() => {}} />
  );

  expect(settings.baseElement).toBeInTheDocument();
});

describe('Is imperials units checkbox visible', () => {
  it('showed after click the icon', () => {
    render(<Settings isImperialUnit={false} onUnitsSystemChanged={() => {}} />);
    fireEvent.click(document.querySelector('img') as Element);
    const isImperialCheckBox = document.querySelector(
      '#flexSwitchCheckDefault'
    );

    expect(isImperialCheckBox as Element).toBeInTheDocument();
  });

  it('not showed without click the icon', () => {
    render(<Settings isImperialUnit={false} onUnitsSystemChanged={() => {}} />);
    const isImperialCheckBox = document.querySelector(
      '#flexSwitchCheckDefault'
    );

    expect(isImperialCheckBox).toBeNull();
  });
});

test('Change units system', () => {
  let isImperialUnit = false;

  render(
    <Settings
      isImperialUnit={isImperialUnit}
      onUnitsSystemChanged={() => {
        isImperialUnit = !isImperialUnit;
      }}
    />
  );

  fireEvent.click(document.querySelector('img') as Element);

  const isImperialCheckBox = document.querySelector('#flexSwitchCheckDefault');
  fireEvent.click(isImperialCheckBox as Element);

  expect(isImperialUnit).toEqual(true);
});
