import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import MetaLabel from './MetaLabel';

describe('MetaLabel renders correctly', () => {
  test('label', () => {
    const testLabel = 'Hello';
    const testData = 'World!';
    const {queryByText} = render(
      <MetaLabel label={testLabel} data={testData} />,
    );
    expect(queryByText(/Hello/)).toBeTruthy();
  });
  test('value', () => {
    const testData = 'World!';
    const {queryByText} = render(<MetaLabel data={testData} />);
    expect(queryByText(/World!/)).toBeTruthy();
  });
  test('no data', () => {
    const testLabel = 'Hello';
    const {queryByText} = render(<MetaLabel label={testLabel} />);
    expect(queryByText(/Hello/)).toBeFalsy();
  });
});
