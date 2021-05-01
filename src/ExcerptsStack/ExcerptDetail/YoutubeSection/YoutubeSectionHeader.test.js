import 'react-native';
import React from 'react';
import YouTubeSectionHeader from './YouTubeSectionHeader';
import MockContext from '../../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('YouTubeSectionHeader renders correctly', () => {
  render(
    <MockContext>
      <YouTubeSectionHeader />
    </MockContext>,
  );
});
