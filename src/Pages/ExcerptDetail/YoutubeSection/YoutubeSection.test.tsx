import 'react-native';
import React from 'react';
import YouTubeSection from './YouTubeSection';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('YouTubeSection renders correctly', () => {
  render(
    <MockContext>
      <YouTubeSection data={'straussHeldenleben'} />
    </MockContext>,
  );
});
