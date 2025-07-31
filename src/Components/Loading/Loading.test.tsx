import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import Loading from './Loading';

describe('renders Loading', () => {
  test('renders base component', () => {
    render(<Loading />);
  });
});
