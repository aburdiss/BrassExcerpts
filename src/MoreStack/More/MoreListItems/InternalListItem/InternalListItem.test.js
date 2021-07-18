import 'react-native';
import React from 'react';
import InternalListItem from './InternalListItem';
import MockContext from '../../../../../jest/MockContext';
import MockNavigator from '../../../../../jest/MockNavigator';

import { render } from '@testing-library/react-native';

test('InternalListItem renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <InternalListItem item={{ value: '' }} />
      </MockContext>
    </MockNavigator>,
  );
});
