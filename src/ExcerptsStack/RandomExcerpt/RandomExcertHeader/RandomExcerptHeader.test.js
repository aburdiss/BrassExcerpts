import 'react-native';
import React from 'react';
import RandomExcerptHeader from './RandomExcerptHeader';
import MockContext from '../../../../jest/MockContext';

import {render} from '@testing-library/react-native';
import MockNavigator from '../../../../jest/MockNavigator';

test('RandomExcerptHeader renders correctly', () => {
  render(
    <MockContext>
      <RandomExcerptHeader />
    </MockContext>,
  );
});

describe('RandomExcerptHeader renders all text components', () => {
  const testComposer = 'Bach';
  const testCompositionName = 'Symphony No. 2';
  const testExcerptNumber = 'Excerpt 1';
  const testInstrumentPart = 'F Alto Trumpet';
  const testExcerptMeasures = 'Mov. I, mm. 1 - 37';
  const testComposition = {
    name: testCompositionName,
    excerpts: [
      {
        id: 0,
        description: testExcerptNumber,
        measures: testExcerptMeasures,
        pictures: [[testInstrumentPart, 'Mock/Picture/Path.png']],
      },
    ],
    composer: testComposer,
  };

  test('composition', () => {
    const {queryByText} = render(
      <MockNavigator>
        <RandomExcerptHeader
          composition={testComposition}
          excerptIndex={0}
          partIndex={0}
        />
      </MockNavigator>,
    );
    const compositionText = queryByText(testCompositionName);
    expect(compositionText).not.toBeNull();
  });

  test('composer', () => {
    const {queryByText} = render(
      <MockNavigator>
        <RandomExcerptHeader
          composition={testComposition}
          excerptIndex={0}
          partIndex={0}
        />
      </MockNavigator>,
    );
    const composerText = queryByText(testComposer);
    expect(composerText).not.toBeNull();
  });

  test('excerpt number', () => {
    const {queryByText} = render(
      <MockNavigator>
        <RandomExcerptHeader
          composition={testComposition}
          excerptIndex={0}
          partIndex={0}
        />
      </MockNavigator>,
    );
    const excerptNumber = queryByText(testExcerptNumber);
    expect(excerptNumber).not.toBeNull();
  });

  test('excerpt measuers', () => {
    const {queryByText} = render(
      <MockNavigator>
        <RandomExcerptHeader
          composition={testComposition}
          excerptIndex={0}
          partIndex={0}
        />
      </MockNavigator>,
    );
    const excertpMeasures = queryByText(testExcerptMeasures);
    expect(excertpMeasures).not.toBeNull();
  });

  test('excerpt part name', () => {
    const {queryByText} = render(
      <MockNavigator>
        <RandomExcerptHeader
          composition={testComposition}
          excerptIndex={0}
          partIndex={0}
        />
      </MockNavigator>,
    );
    const excerptPartName = queryByText(testInstrumentPart);
    expect(excerptPartName).not.toBeNull();
  });
});
