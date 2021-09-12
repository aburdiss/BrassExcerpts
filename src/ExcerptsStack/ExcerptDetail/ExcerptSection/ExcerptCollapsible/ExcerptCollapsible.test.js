import 'react-native';
import React from 'react';
import ExcerptCollapsible from './ExcerptCollapsible';
import MockContext from '../../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

const mockExcerpt = {
  description: '',
  pictures: [],
};

test('ExcerptCollapsible renders correctly', () => {
  render(
    <MockContext>
      <ExcerptCollapsible excerpt={mockExcerpt} />
    </MockContext>,
  );
});
