import 'react-native';
import React from 'react';
import ExcerptListHeader from './ExcerptListHeader';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ExcerptListHeader renders correctly', () => {
  render(
    <MockContext>
      <ExcerptListHeader />
    </MockContext>,
  );
});
