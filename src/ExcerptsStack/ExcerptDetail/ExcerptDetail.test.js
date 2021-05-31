import 'react-native';
import React from 'react';
import ExcerptDetail from './ExcerptDetail';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';
import MockNavigator from '../../../jest/MockNavigator';

test('ExcerptDetail renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <ExcerptDetail />
      </MockContext>
    </MockNavigator>,
  );
});
