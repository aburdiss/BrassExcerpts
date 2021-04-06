import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import HeaderButton from './HeaderButton';

test('HeaderButton renders correctly', () => {
  const {queryByText} = render(
    <HeaderButton handler={() => {}}>Arpeggios</HeaderButton>,
  );
  expect(queryByText(/Arpeggios/)).toBeTruthy();
});

test('HeaderButton calls function correctly', () => {
  const buttonPress = jest.fn();
  const {getByText} = render(
    <HeaderButton handler={buttonPress}>Press Me</HeaderButton>,
  );
  fireEvent.press(getByText(/Press Me/));
  expect(buttonPress).toHaveBeenCalledTimes(1);
  fireEvent.press(getByText(/Press Me/));
  expect(buttonPress).toHaveBeenCalledTimes(2);
});
