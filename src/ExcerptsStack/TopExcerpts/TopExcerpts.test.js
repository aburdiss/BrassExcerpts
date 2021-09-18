import 'react-native';
import React from 'react';
import TopExcerpts from './TopExcerpts';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('TopExcerpts renders correctly', () => {
  render(
    <MockContext>
      <TopExcerpts />
    </MockContext>,
  );
});
