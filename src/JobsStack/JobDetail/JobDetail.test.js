import 'react-native';
import React from 'react';
import JobDetail from './JobDetail';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('JobDetail renders correctly', () => {
  render(
    <MockContext>
      <JobDetail />
    </MockContext>,
  );
});
