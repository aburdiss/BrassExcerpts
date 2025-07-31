import 'react-native';
import React from 'react';
import SegmentedFilterListItem from './SegmentedFilterListItem';
import MockContext from '../../../../jest/MockContext';

import { render } from '@testing-library/react-native';

test('SegmentedFilterListItem renders correctly', () => {
  render(
    <MockContext>
      <SegmentedFilterListItem
        item={{ instrument: undefined, setting: 'randomFavorites' }}
        state={{}}
      />
    </MockContext>,
  );
});
