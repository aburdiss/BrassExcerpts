import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import MainHeadingComponent from './MainHeading';
import MockContext from '../../../jest/MockContext';

function MainHeading(props) {
  return (
    <MockContext>
      <MainHeadingComponent {...props} />
    </MockContext>
  );
}

describe('renders MainHeading correctly', () => {
  test('renders children', () => {
    const headingText = 'Hello, Heading Button!';
    const { getByText } = render(<MainHeading>{headingText}</MainHeading>);
    expect(getByText(headingText)).not.toBeNull();
  });
});
