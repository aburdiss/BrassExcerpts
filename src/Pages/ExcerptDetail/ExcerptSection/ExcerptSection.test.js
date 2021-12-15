import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ExcerptSection from './ExcerptSection';
import MockContext from '../../../../jest/MockContext';

const mockItem = {};

test('ExcerptSection renders correctly', () => {
  render(
    <MockContext>
      <ExcerptSection item={mockItem} />
    </MockContext>,
  );
});
