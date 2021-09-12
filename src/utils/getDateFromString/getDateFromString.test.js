import { getDateFromString } from './getDateFromString';

test('utility is a function', () => {
  expect(typeof getDateFromString).toEqual('function');
});

describe('getDateFromString has correct output', () => {
  test('returns Object', () => {
    const input = 'April 19, 1775';
    const output = getDateFromString(input);
    expect(typeof output).toEqual('object');
  });

  test('returns JS Date Object', () => {
    const input = 'April 19, 1775';
    const output = getDateFromString(input);
    expect(typeof output.getDay).toEqual('function');
  });
});
