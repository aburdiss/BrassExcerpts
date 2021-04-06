import 'react-native';
import React from 'react';
import CreateCustomAudition from './CreateCustomAudition';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('CreateCustomAudition renders correctly', () => {
  render(
    <MockContext>
      <CreateCustomAudition />
    </MockContext>,
  );
});
