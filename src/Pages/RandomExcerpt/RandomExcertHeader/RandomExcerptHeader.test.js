import 'react-native';
import React from 'react';
import RandomExcerptHeaderComponent from './RandomExcerptHeader';
import MockContext from '../../../../jest/MockContext';
import MockNavigator from '../../../../jest/MockNavigator';

import { render } from '@testing-library/react-native';

function RandomExcerptHeader(props) {
  return (
    <MockContext>
      <MockNavigator>
        <RandomExcerptHeaderComponent {...props} />
      </MockNavigator>
    </MockContext>
  );
}

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
    const { queryByText } = render(
      <RandomExcerptHeader
        composition={testComposition}
        excerptIndex={0}
        partIndex={0}
      />,
    );
    const compositionText = queryByText(testCompositionName);
    expect(compositionText).not.toBeNull();
  });

  test('composer', () => {
    const { queryByText } = render(
      <RandomExcerptHeader
        composition={testComposition}
        excerptIndex={0}
        partIndex={0}
      />,
    );
    const composerText = queryByText(testComposer);
    expect(composerText).not.toBeNull();
  });

  test('excerpt number', () => {
    const { queryByText } = render(
      <RandomExcerptHeader
        composition={testComposition}
        excerptIndex={0}
        partIndex={0}
      />,
    );
    const excerptNumber = queryByText(testExcerptNumber);
    expect(excerptNumber).not.toBeNull();
  });

  test('excerpt measuers', () => {
    const { queryByText } = render(
      <RandomExcerptHeader
        composition={testComposition}
        excerptIndex={0}
        partIndex={0}
      />,
    );
    const excertpMeasures = queryByText(testExcerptMeasures);
    expect(excertpMeasures).not.toBeNull();
  });

  test('excerpt part name', () => {
    const { queryByText } = render(
      <RandomExcerptHeader
        composition={testComposition}
        excerptIndex={0}
        partIndex={0}
      />,
    );
    const excerptPartName = queryByText(testInstrumentPart);
    expect(excerptPartName).not.toBeNull();
  });
});
