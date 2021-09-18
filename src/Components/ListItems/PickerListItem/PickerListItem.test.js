import 'react-native';
import React from 'react';
import PickerListItemComponent from './PickerListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

function PickerListItem(props) {
  return (
    <MockContext>
      <PickerListItemComponent {...props} />
    </MockContext>
  );
}

test('PickerListItem renders correctly', () => {
  render(
    <PickerListItem
      item={{ instrument: undefined, setting: 'theme' }}
      state={{}}
    />,
  );
});
