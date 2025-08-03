import { Instrument } from '../../Enums/instrument';
import { Preferences } from '../../Types/preferences';
import { getActiveInstrument } from './getActiveInstrument';

describe('returns correct active instrument', () => {
  test('horn', () => {
    let activeInstrument = getActiveInstrument({ horn: true } as Preferences);
    expect(activeInstrument).toEqual(Instrument.Horn);
  });
  test('trumpet', () => {
    let activeInstrument = getActiveInstrument({
      trumpet: true,
    } as Preferences);
    expect(activeInstrument).toEqual(Instrument.Trumpet);
  });
  test('trombone', () => {
    let activeInstrument = getActiveInstrument({
      trombone: true,
    } as Preferences);
    expect(activeInstrument).toEqual(Instrument.Trombone);
  });
  test('tuba', () => {
    let activeInstrument = getActiveInstrument({ tuba: true } as Preferences);
    expect(activeInstrument).toEqual(Instrument.Tuba);
  });
  test('none', () => {
    let activeInstrument = getActiveInstrument({} as Preferences);
    expect(activeInstrument).toEqual(undefined);
  });
});
