import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import HeaderButton from './HeaderButton';

test('HeaderButton renders correctly', () => {
  render(<HeaderButton />);
});
