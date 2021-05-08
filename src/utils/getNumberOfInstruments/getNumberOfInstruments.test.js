import {getNumberOfInstruments} from './getNumberOfInstruments';

describe('getNumberOfInstruments returns correct number of instruments', () => {
  test('none', () => {
    let numberOfInstruments = getNumberOfInstruments({});
    expect(numberOfInstruments).toEqual(0);
  });
  test('horn only', () => {
    let numberOfInstruments = getNumberOfInstruments({horn: true});
    expect(numberOfInstruments).toEqual(1);
  });
  test('horn and trumpet only', () => {
    let numberOfInstruments = getNumberOfInstruments({
      horn: true,
      trumpet: true,
    });
    expect(numberOfInstruments).toEqual(2);
  });
  test('horn, trumpet, and trombone only', () => {
    let numberOfInstruments = getNumberOfInstruments({
      horn: true,
      trumpet: true,
      trombone: true,
    });
    expect(numberOfInstruments).toEqual(3);
  });
  test('all instruments selected', () => {
    let numberOfInstruments = getNumberOfInstruments({
      horn: true,
      trumpet: true,
      trombone: true,
      tuba: true,
    });
    expect(numberOfInstruments).toEqual(4);
  });
});
