import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ConditionalExcerptLink from './ConditionalExcerptLink';

describe('renders ConditionalExcerptLink', () => {
  test('renders base component', () => {
    render(<ConditionalExcerptLink />);
  });
});
