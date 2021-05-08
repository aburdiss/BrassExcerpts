import {getDaysUntilDate} from './getDaysUntilDate';

describe('getDaysUntilDate returns correct number of days', () => {
  let today = new Date();

  test('-1', () => {
    let negativeOne = new Date().setDate(today.getDate() - 1);
    expect(getDaysUntilDate(negativeOne)).toEqual(-1);
  });

  test('0', () => {
    let zero = new Date().setDate(today.getDate() + 0);
    expect(getDaysUntilDate(zero)).toEqual(0);
  });

  test('1', () => {
    let one = new Date().setDate(today.getDate() + 1);
    expect(getDaysUntilDate(one)).toEqual(1);
  });

  test('4', () => {
    let four = new Date().setDate(today.getDate() + 4);
    expect(getDaysUntilDate(four)).toEqual(4);
  });

  test('29', () => {
    let twentyNine = new Date().setDate(today.getDate() + 29);
    expect(getDaysUntilDate(twentyNine)).toEqual(29);
  });

  test('60', () => {
    let sixty = new Date().setDate(today.getDate() + 60);
    expect(getDaysUntilDate(sixty)).toEqual(60);
  });
});
