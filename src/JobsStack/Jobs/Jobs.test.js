import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import MockContext from '../../../jest/MockContext';
import MockNavigator from '../../../jest/MockNavigator';

import Jobs from './Jobs';

test('Jobs renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <Jobs />
      </MockContext>
    </MockNavigator>,
  );
});
