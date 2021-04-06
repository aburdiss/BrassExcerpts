import 'react-native';
import React from 'react';
import ExcerptListRow from './ExcerptListRow';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ExcerptListRow renders correctly', () => {
  render(
    <MockContext>
      <ExcerptListRow />
    </MockContext>,
  );
});
