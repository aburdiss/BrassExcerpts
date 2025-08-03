import { getDateFromString } from '../getDateFromString/getDateFromString';

/**
 * @function getDaysUntilDate
 * @description Gets the number of days until the inputted date.
 * Created 3/28/21
 * @param {string} date The date you want to find the number of days until
 * @returns The number of days until the inputed date.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.1
 */
export function getDaysUntilDate(date: string): number | undefined {
  const dateFromString = getDateFromString(date);
  if (dateFromString === undefined) {
    return;
  }
  const futureDate = dateFromString;
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
  const differenceInMilliseconds = futureDate.getTime() - new Date().getTime();
  return Math.round(differenceInMilliseconds / oneDayInMilliseconds);
}
