import { getDaysUntilDate } from './getDaysUntilDate';
import { daysToMilliseconds } from '../daysToMilliseconds/daysToMilliseconds';

describe('getDaysUntilDate returns correct number of days', () => {
  let today = new Date();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  test('-1', () => {
    let negativeOne = new Date();
    negativeOne.setTime(today.getTime() - daysToMilliseconds(1));
    let negativeOneDate = `${
      monthNames[negativeOne.getMonth()]
    } ${negativeOne.getDate()}, ${negativeOne.getFullYear()}`;
    expect(getDaysUntilDate(negativeOneDate)).toEqual(-1);
  });

  test('0', () => {
    let zero = new Date();
    zero.setTime(today.getTime() + daysToMilliseconds(0));
    let zeroDate = `${
      monthNames[zero.getMonth()]
    } ${zero.getDate()}, ${zero.getFullYear()}`;
    expect(getDaysUntilDate(zeroDate)).toEqual(0);
  });

  test('1', () => {
    let one = new Date();
    one.setTime(today.getTime() + daysToMilliseconds(1));
    let oneDate = `${
      monthNames[one.getMonth()]
    } ${one.getDate()}, ${one.getFullYear()}`;
    expect(getDaysUntilDate(oneDate)).toEqual(1);
  });

  test('4', () => {
    let four = new Date();
    four.setTime(today.getTime() + daysToMilliseconds(4));
    let fourDate = `${
      monthNames[four.getMonth()]
    } ${four.getDate()}, ${four.getFullYear()}`;
    expect(getDaysUntilDate(fourDate)).toEqual(4);
  });

  test('29', () => {
    let twentyNine = new Date();
    twentyNine.setTime(today.getTime() + daysToMilliseconds(29));
    let twentyNineDate = `${
      monthNames[twentyNine.getMonth()]
    } ${twentyNine.getDate()}, ${twentyNine.getFullYear()}`;
    expect(getDaysUntilDate(twentyNineDate)).toEqual(29);
  });

  test('60', () => {
    let sixty = new Date();
    sixty.setTime(today.getTime() + daysToMilliseconds(60));
    let sixtyDate = `${
      monthNames[sixty.getMonth()]
    } ${sixty.getDate()}, ${sixty.getFullYear()}`;
    console.log(sixtyDate);
    expect(getDaysUntilDate(sixtyDate)).toEqual(60);
  });
});
