import { getInstrumentsSelected } from './getInstrumentsSelected';

describe('getInstrumentsSelected returns correct instruments', () => {
  describe('one instrument', () => {
    test('horn', () => {
      const mockState = {
        horn: true,
        trumpet: false,
        trombone: false,
        tuba: false,
      };
      const expectedResult = 'Horn';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('trumpet', () => {
      const mockState = {
        horn: false,
        trumpet: true,
        trombone: false,
        tuba: false,
      };
      const expectedResult = 'Trumpet';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('trombone', () => {
      const mockState = {
        horn: false,
        trumpet: false,
        trombone: true,
        tuba: false,
      };
      const expectedResult = 'Trombone';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('tuba', () => {
      const mockState = {
        horn: false,
        trumpet: false,
        trombone: false,
        tuba: true,
      };
      const expectedResult = 'Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
  });
  describe('two instruments', () => {
    test('horn and trumpet', () => {
      const mockState = {
        horn: true,
        trumpet: true,
        trombone: false,
        tuba: false,
      };
      const expectedResult = 'Horn, Trumpet';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('horn and trombone', () => {
      const mockState = {
        horn: true,
        trumpet: false,
        trombone: true,
        tuba: false,
      };
      const expectedResult = 'Horn, Trombone';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('horn and tuba', () => {
      const mockState = {
        horn: true,
        trumpet: false,
        trombone: false,
        tuba: true,
      };
      const expectedResult = 'Horn, Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('trumpet and trombone', () => {
      const mockState = {
        horn: false,
        trumpet: true,
        trombone: true,
        tuba: false,
      };
      const expectedResult = 'Trumpet, Trombone';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('trumpet and tuba', () => {
      const mockState = {
        horn: false,
        trumpet: true,
        trombone: false,
        tuba: true,
      };
      const expectedResult = 'Trumpet, Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('trombone and tuba', () => {
      const mockState = {
        horn: false,
        trumpet: false,
        trombone: true,
        tuba: true,
      };
      const expectedResult = 'Trombone, Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
  });
  describe('three instruments', () => {
    test('horn, trumpet, trombone', () => {
      const mockState = {
        horn: true,
        trumpet: true,
        trombone: true,
        tuba: false,
      };
      const expectedResult = 'Horn, Trumpet, Trombone';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('horn, trumpet, tuba', () => {
      const mockState = {
        horn: true,
        trumpet: true,
        trombone: false,
        tuba: true,
      };
      const expectedResult = 'Horn, Trumpet, Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('horn, trombone, tuba', () => {
      const mockState = {
        horn: true,
        trumpet: false,
        trombone: true,
        tuba: true,
      };
      const expectedResult = 'Horn, Trombone, Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
    test('trumpet, trombone, tuba', () => {
      const mockState = {
        horn: false,
        trumpet: true,
        trombone: true,
        tuba: true,
      };
      const expectedResult = 'Trumpet, Trombone, Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
  });
  describe('four instruments', () => {
    test('all instruments', () => {
      const mockState = {
        horn: true,
        trumpet: true,
        trombone: true,
        tuba: true,
      };
      const expectedResult = 'Horn, Trumpet, Trombone, Tuba';
      const instrumentsSelected = getInstrumentsSelected(mockState);
      expect(instrumentsSelected).toEqual(expectedResult);
    });
  });
});
