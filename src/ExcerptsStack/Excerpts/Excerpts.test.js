import 'react-native';
import React from 'react';
import Excerpts from './Excerpts';
import MockContext from '../../../jest/MockContext';

import {render} from '@testing-library/react-native';

test('Excerpts renders correctly', () => {
  render(
    <MockContext>
      <Excerpts />
    </MockContext>,
  );
});
