import 'react-native';
import React from 'react';
import Jobs from './Jobs';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('Jobs renders correctly', () => {
  render(
    <MockContext>
      <Jobs />
    </MockContext>,
  );
});
