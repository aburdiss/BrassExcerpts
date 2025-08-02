import 'react-native';
import React from 'react';
import Excerpts from './Excerpts';
import MockNavigator from '../../../jest/MockNavigator';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('Excerpts renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <Excerpts />
      </MockContext>
    </MockNavigator>,
  );
});
