import 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';

import ScrollViewBounceContainer from './ScrollViewBounceContainer';

describe('renders ScrollViewBounceContainer correctly', () => {
  test('contains top section colors', () => {
    const { getByTestId } = render(
      <ScrollViewBounceContainer topBounceColor="#000" bottomBounceColor="#FFF">
        Hello
      </ScrollViewBounceContainer>,
    );
    const topBounceColor = getByTestId('topBounce');
    expect(topBounceColor).not.toBeNull();
  });
  test('contains bottom section colors', () => {
    const { getByTestId } = render(
      <ScrollViewBounceContainer topBounceColor="#000" bottomBounceColor="#FFF">
        Hello
      </ScrollViewBounceContainer>,
    );
    const bottomBounceColor = getByTestId('bottomBounce');
    expect(bottomBounceColor).not.toBeNull();
  });
});
