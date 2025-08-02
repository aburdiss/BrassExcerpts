import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ResourcesSectionComponent from './ResourcesSection';
import MockContext from '../../../../jest/MockContext';

function ResourcesSection(props) {
  return (
    <MockContext>
      <ResourcesSectionComponent {...props} />
    </MockContext>
  );
}

describe('renders ResourcesSection', () => {
  test('renders base component', () => {
    render(<ResourcesSection />);
  });
});
