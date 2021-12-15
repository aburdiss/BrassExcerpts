import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import MockContext from '../../../jest/MockContext';
import RemoteImageComponent from './RemoteImage';

/**
 * @function RemoteImage
 * @description A wrapper for the RemoteImage component that passes the Context
 * to every instance of the component for more readable tests.
 * @param {object} props Any props to be applied to the RemoteImage component
 * directly
 * @author Alexander Burdiss
 * @since 12/14/21
 * @version 1.0.0
 * @component
 */
function RemoteImage(props) {
  return (
    <MockContext>
      <RemoteImageComponent {...props} />
    </MockContext>
  );
}

describe('renders RemoteImage', () => {
  test('renders base component', () => {
    render(<RemoteImage />);
  });
});
