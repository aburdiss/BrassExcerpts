import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import SectionHeader from './SectionHeader';

describe('renders SectionHeader correctly', () => {
  test('renders children', () => {
    const headingText = 'Hello, Section Button!';
    const { getByText } = render(<SectionHeader>{headingText}</SectionHeader>);
    expect(getByText(headingText)).not.toBeNull();
  });
});
