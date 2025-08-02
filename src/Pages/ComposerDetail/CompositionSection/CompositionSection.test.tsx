import 'react-native';
import React from 'react';
import CompositionSection from './CompositionSection';
import MockContext from '../../../../jest/MockContext';
import MockNavigator from '../../../../jest/MockNavigator';

import { render } from '@testing-library/react-native';

test('CompositionSection renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <CompositionSection excerpts={[]} />
      </MockContext>
    </MockNavigator>,
  );
});
