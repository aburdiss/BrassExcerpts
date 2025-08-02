import 'react-native';
import React from 'react';
import MetaContainer from './MetaContainer';
import MockContext from '../../../../jest/MockContext';
import MockNavigator from '../../../../jest/MockNavigator';

import { render } from '@testing-library/react-native';

test('MetaContainer renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <MetaContainer />
      </MockContext>
    </MockNavigator>,
  );
});
