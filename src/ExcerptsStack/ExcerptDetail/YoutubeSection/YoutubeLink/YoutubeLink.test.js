import 'react-native';
import React from 'react';
import YouTubeLink from './YouTubeLink';
import MockContext from '../../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('YouTubeLink renders correctly', () => {
  render(
    <MockContext>
      <YouTubeLink video={['Test', 'Test1']} />
    </MockContext>,
  );
});
