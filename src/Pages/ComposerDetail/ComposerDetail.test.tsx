import 'react-native';
import React from 'react';
import ComposerDetail from './ComposerDetail';
import MockContext from '../../../jest/MockContext';
import MockNavigator from '../../../jest/MockNavigator';

import { render } from '@testing-library/react-native';

test('ComposerDetail renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <ComposerDetail />
      </MockContext>
    </MockNavigator>,
  );
});
