import 'react-native';
import React from 'react';
import Calendar from './Calendar';
import MockContext from '../../../../jest/MockContext';
import MockNavigator from '../../../../jest/MockNavigator';

import { render } from '@testing-library/react-native';

test('Calendar renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <Calendar />
      </MockContext>
    </MockNavigator>,
  );
});
