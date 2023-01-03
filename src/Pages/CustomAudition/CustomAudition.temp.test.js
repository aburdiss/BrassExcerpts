import 'react-native';
import React from 'react';
import CustomAudition from './CustomAudition';
import MockContext from '../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('CustomAudition renders correctly', () => {
  render(
    <MockContext>
      <CustomAudition />
    </MockContext>,
  );
});
