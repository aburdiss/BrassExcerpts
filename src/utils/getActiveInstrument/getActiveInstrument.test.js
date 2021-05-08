import {getActiveInstrument} from './getActiveInstrument';

describe('returns correct active instrument', () => {
  test('horn', () => {
    let activeInstrument = getActiveInstrument({horn: true});
    expect(activeInstrument).toEqual('horn');
  });
  test('trumpet', () => {
    let activeInstrument = getActiveInstrument({trumpet: true});
    expect(activeInstrument).toEqual('trumpet');
  });
  test('trombone', () => {
    let activeInstrument = getActiveInstrument({trombone: true});
    expect(activeInstrument).toEqual('trombone');
  });
  test('tuba', () => {
    let activeInstrument = getActiveInstrument({tuba: true});
    expect(activeInstrument).toEqual('tuba');
  });
  test('none', () => {
    let activeInstrument = getActiveInstrument({});
    expect(activeInstrument).toEqual(undefined);
  });
});
