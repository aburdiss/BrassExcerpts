import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import SectionHeadingComponent from './SectionHeading';
import MockContext from '../../../jest/MockContext';

function SectionHeading(props) {
  return (
    <MockContext>
      <SectionHeadingComponent {...props} />
    </MockContext>
  );
}

describe('renders SectionHeading correctly', () => {
  test('renders children', () => {
    const headingText = 'Hello, Section Button!';
    const { getByText } = render(
      <SectionHeading>{headingText}</SectionHeading>,
    );
    expect(getByText(headingText)).not.toBeNull();
  });
});
