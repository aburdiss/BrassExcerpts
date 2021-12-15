import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import CreateCustomAudition from './CreateCustomAudition';
import MockContext from '../../../jest/MockContext';

test('CreateCustomAudition renders correctly', () => {
  render(
    <MockContext>
      <CreateCustomAudition />
    </MockContext>,
  );
});
