import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import SectionHeaderComponent from './SectionHeader';
import MockContext from '../../../jest/MockContext';

function SectionHeader(props) {
  return (
    <MockContext>
      <SectionHeaderComponent {...props} />
    </MockContext>
  );
}

describe('renders SectionHeader correctly', () => {
  test('renders children', () => {
    const headingText = 'Hello, Section Button!';
    const { getByText } = render(<SectionHeader>{headingText}</SectionHeader>);
    expect(getByText(headingText)).not.toBeNull();
  });
});
