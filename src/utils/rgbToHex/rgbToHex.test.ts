import { rgbToHex } from './rgbToHex';

describe('rgbToHex has correct output', () => {
  test('returns string', () => {
    const output = rgbToHex('rgb(0, 0, 0)');
    expect(typeof output).toEqual('string');
  });

  test('outputted string has hash', () => {
    const output = rgbToHex('rgb(0, 0, 0)');
    const outputContainsHash = output.includes('#');
    expect(outputContainsHash).toBeTruthy();
  });

  test('outputted string has six digit number', () => {
    const output = rgbToHex('rgb(0, 0, 0)');
    const outputMinusHash = output.replace('#', '');
    expect(outputMinusHash.length).toEqual(6);
  });
});
