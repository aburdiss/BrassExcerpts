/**
 * @function daysToMilliseconds
 * @description Converts days to milliseconds
 * Created 9/11/21
 * @param {number} days A number in days
 * @returns {number} The millisecond equivalent of the inputted days
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}
