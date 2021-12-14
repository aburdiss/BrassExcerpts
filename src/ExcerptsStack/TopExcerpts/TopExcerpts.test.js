import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import TopExcerptsComponent from './TopExcerpts';
import MockContext from '../../../jest/MockContext';
import MockNavigator from '../../../jest/MockNavigator';

function TopExcerpts({ props }) {
  return (
    <MockContext>
      <MockNavigator>
        <TopExcerptsComponent {...props} />
      </MockNavigator>
    </MockContext>
  );
}

test('TopExcerpts renders correctly', () => {
  render(<TopExcerpts />);
});
