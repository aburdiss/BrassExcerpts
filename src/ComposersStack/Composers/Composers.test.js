import 'react-native';
import React from 'react';
import Composers from './Composers';
import MockContext from '../../../jest/MockContext';
import MockNavigator from '../../../jest/MockNavigator';

import {render} from '@testing-library/react-native';

test('Composers renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <Composers />
      </MockContext>
    </MockNavigator>,
  );
});
