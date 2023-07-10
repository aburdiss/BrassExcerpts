/**
 * @function getMonthIndex
 * @description Converts a human readable month to a JS Date formatted month
 * number.
 * Created 8/3/21
 * @param {string} month The month in human readable string format, with a
 * capital letter
 * @returns {number} The index of the month compatible with the JS Date object.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function getMonthIndex(month) {
  return {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  }[month];
}
