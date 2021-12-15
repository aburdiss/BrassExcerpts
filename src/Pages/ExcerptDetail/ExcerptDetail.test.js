import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ExcerptDetail from './ExcerptDetail';
import MockContext from '../../../jest/MockContext';
import MockNavigator from '../../../jest/MockNavigator';

test('ExcerptDetail renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <ExcerptDetail
          route={{
            params: {
              id: 49,
              composer: 'Carl Maria von Weber',
              composerLast: 'Weber',
              name: 'Oberon',
              date: '1826',
              era: 'Romantic',
              genre: 'Opera',
              excerpts: [
                {
                  id: 153,
                  description: 'Excerpt 1',
                  measures: 'Overture, Beginning - [A]',
                  pictures: [['D Horn 1', 'Horn/WeberOberon/1554.png']],
                },
              ],
              mutes: '',
              videos: 'weberOberon',
            },
          }}
        />
      </MockContext>
    </MockNavigator>,
  );
});
