import { getDateFromString } from '../getDateFromString/getDateFromString.ts';

/**
 * @function isDateAfterToday
 * @description Returns whether or not the passed in date is after today.
 * Created 10/23/21
 * @param {string} date The date to check
 * @returns {boolean} Whether or not the passed in date is after today
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function isDateAfterToday(date: string): boolean {
  const dateObject = getDateFromString(date);
  if (!dateObject) {
    return false;
  }
  return dateObject > new Date();
}
