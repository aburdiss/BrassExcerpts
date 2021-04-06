import 'react-native';
import React from 'react';
import CompositionSection from './CompositionSection';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('CompositionSection renders correctly', () => {
  render(
    <MockContext>
      <CompositionSection />
    </MockContext>,
  );
});
