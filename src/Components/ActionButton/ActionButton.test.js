import 'react-native';
import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import ActionButtonComponent from './ActionButton';
import MockContext from '../../../jest/MockContext';

function ActionButton(props) {
  return (
    <MockContext>
      <ActionButtonComponent {...props} />
    </MockContext>
  );
}

test('ActionButton renders correctly', () => {
  const { queryByText } = render(
    <ActionButton onPress={() => {}}>
      <Text>Press Me</Text>
    </ActionButton>,
  );
  expect(queryByText(/Press Me/)).toBeTruthy();
});

describe('ActionButton calls function correctly', () => {
  test('one time', () => {
    const buttonPress = jest.fn();
    const { getByText } = render(
      <ActionButton onPress={buttonPress}>
        <Text>Press Me</Text>
      </ActionButton>,
    );
    fireEvent.press(getByText(/Press Me/));
    expect(buttonPress).toHaveBeenCalledTimes(1);
  });

  test('two times', () => {
    const buttonPress = jest.fn();
    const { getByText } = render(
      <ActionButton onPress={buttonPress}>
        <Text>Press Me</Text>
      </ActionButton>,
    );
    fireEvent.press(getByText(/Press Me/));
    fireEvent.press(getByText(/Press Me/));
    expect(buttonPress).toHaveBeenCalledTimes(2);
  });
});
