import 'react-native';
import React from 'react';
import PastJobs from './PastJobs';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('PastJobs renders correctly', () => {
  render(
    <MockContext>
      <PastJobs />
    </MockContext>,
  );
});
