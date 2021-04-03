import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import MetaLabel from './MetaLabel';

test('MetaLabel renders correctly', () => {
  const testLabel = 'Hello';
  const testData = 'World!';
  const {queryByText} = render(<MetaLabel label={testLabel} data={testData} />);
  expect(queryByText(/Hello/)).toBeTruthy();
  expect(queryByText(/World!/)).toBeTruthy();
});
