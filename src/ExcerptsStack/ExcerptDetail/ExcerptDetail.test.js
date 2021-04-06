import 'react-native';
import React from 'react';
import ExcerptDetail from './ExcerptDetail';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ExcerptDetail renders correctly', () => {
  render(
    <MockContext>
      <ExcerptDetail />
    </MockContext>,
  );
});
