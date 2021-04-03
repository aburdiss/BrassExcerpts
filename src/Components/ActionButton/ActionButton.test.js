import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import ActionButton from './ActionButton';

test('ActionButton renders correctly', () => {
  const {queryByText} = render(
    <ActionButton onPress={() => {}}>
      <Text>Press Me</Text>
    </ActionButton>,
  );
  expect(queryByText(/Press Me/)).toBeTruthy();
});

test('ActionButton calls function correctly', () => {
  const buttonPress = jest.fn();
  const {getByText} = render(
    <ActionButton onPress={buttonPress}>
      <Text>Press Me</Text>
    </ActionButton>,
  );
  fireEvent.press(getByText(/Press Me/));
  expect(buttonPress).toHaveBeenCalledTimes(1);
  fireEvent.press(getByText(/Press Me/));
  expect(buttonPress).toHaveBeenCalledTimes(2);
});
