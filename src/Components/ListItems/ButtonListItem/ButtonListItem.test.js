import 'react-native';
import React from 'react';
import ButtonListItem from './ButtonListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('ButtonListItem renders correctly', () => {
  render(
    <MockContext>
      <ButtonListItem item={{ value: '' }} />
    </MockContext>,
  );
});
