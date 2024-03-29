import 'react-native';
import React from 'react';
import ExcerptListHeader from './ExcerptListHeader';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';
import MockNavigator from '../../../../jest/MockNavigator';

test('ExcerptListHeader renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <ExcerptListHeader />
      </MockContext>
    </MockNavigator>,
  );
});
