import { getDateFromString } from '../getDateFromString/getDateFromString';

export function isDateAfterToday(date) {
  return getDateFromString(date) > new Date();
}
