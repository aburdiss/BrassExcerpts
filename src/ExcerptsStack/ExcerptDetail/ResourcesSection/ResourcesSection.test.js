import 'react-native';
import React from 'react';
import ResourcesSection from './ResourcesSection';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('ResourcesSection renders correctly', () => {
  render(
    <MockContext>
      <ResourcesSection data={'straussHeldenleben'} />
    </MockContext>,
  );
});
