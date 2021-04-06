import 'react-native';
import React from 'react';
import ComposerListRow from './ComposerListRow';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('ComposerListRow renders correctly', () => {
  render(
    <MockContext>
      <ComposerListRow />
    </MockContext>,
  );
});
