import 'react-native';
import React from 'react';
import CompositionSectionHeader from './CompositionSectionHeader';
import MockContext from '../../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('CompositionSectionHeader renders correctly', () => {
  render(
    <MockContext>
      <CompositionSectionHeader />
    </MockContext>,
  );
});
