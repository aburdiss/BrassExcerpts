import 'react-native';
import React from 'react';
import JobsListRow from './JobsListRow';
import MockContext from '../../../../jest/MockContext';
import MockNavigator from '../../../../jest/MockNavigator';

import {render} from '@testing-library/react-native';

test('JobsListRow renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <JobsListRow />
      </MockContext>
    </MockNavigator>,
  );
});
