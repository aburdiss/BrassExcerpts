import { getMonthIndex } from './getMonthIndex';

test('utility is a function', () => {
  expect(typeof getMonthIndex).toEqual('function');
});

describe('getMonthIndex returns correct value', () => {
  test('january is 0', () => {
    const input = 'January';
    const output = getMonthIndex(input);
    expect(output).toEqual(0);
  });

  test('december is 11', () => {
    const input = 'December';
    const output = getMonthIndex(input);
    expect(output).toEqual(11);
  });

  test('month that doesnt exist returns undefined', () => {
    const input = 'NotAMonth';
    const output = getMonthIndex(input);
    expect(output).toEqual(undefined);
  });

  test('output is a number', () => {
    const input = 'June';
    const output = getMonthIndex(input);
    expect(typeof output).toEqual('number');
  });
});
