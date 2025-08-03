import { getContrast } from './getContrast';

const mockColors = {
  alwaysBlack: 'black',
  alwaysWhite: 'white',
};

describe('getContrast has correct output', () => {
  test('returns black for white background', () => {
    const input = '#ffffff';
    const output = getContrast(input, mockColors);
    expect(output).toEqual('black');
  });

  test('returns white for black background', () => {
    const input = '#000000';
    const output = getContrast(input, mockColors);
    expect(output).toEqual('white');
  });

  test('defaults to black if not a color', () => {
    const input = 'Not a color';
    const output = getContrast(input, mockColors);
    expect(output).toEqual('black');
  });
});
