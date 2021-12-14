import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import MockContext from '../../../jest/MockContext';
import ConditionalExcerptLinkComponent from './ConditionalExcerptLink';

const mockState = {
  horn: true,
  trumpet: true,
  trombone: true,
  tuba: true,
  favorites: [],
};

function ConditionalExcerptLink(props) {
  return (
    <MockContext>
      <ConditionalExcerptLinkComponent state={mockState} {...props} />
    </MockContext>
  );
}

describe('renders ConditionalExcerptLink', () => {
  test('renders base component', () => {
    render(
      <ConditionalExcerptLink excerpt={'mahler3'} instrument={'trombone'} />,
    );
  });
});
