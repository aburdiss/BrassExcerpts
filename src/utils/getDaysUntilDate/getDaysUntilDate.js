/**
 * @function getDaysUntilDate
 * @description Gets the number of days until the inputted date.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.0.0
 * @param {String} date The date you want to find the number of days until
 * @returns The number of days until the inputed date.
 */
export function getDaysUntilDate(date) {
  let futureDate = new Date(date);
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
  const differenceInMilliseconds = futureDate - new Date();
  return Math.round(differenceInMilliseconds / oneDayInMilliseconds);
}
