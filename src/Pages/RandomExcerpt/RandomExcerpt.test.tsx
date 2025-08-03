import 'react-native';
import React from 'react';
import RandomExcerpt from './RandomExcerpt';
import MockContext from '../../../jest/MockContext';
import MockNavigator from '../../../jest/MockNavigator';

import { render } from '@testing-library/react-native';

test('RandomExcerpt renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <RandomExcerpt />
      </MockContext>
    </MockNavigator>,
  );
});
