import { getMonthIndex } from '../getMonthIndex/getMonthIndex';
/**
 * @function getDateFromString
 * @description Turns a date string into a JS date object. Uses methods
 * compatible with Android's old JS engine.
 * Created 8/3/21
 * @param {string} dateString The date that needs to be converted to a JS
 * date object. ex. January 21, 2021
 * @returns {Date} A JS Date object from the inputted date.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function getDateFromString(dateString) {
  if (dateString) {
    let dateArray = dateString.split(' ');
    let month = getMonthIndex(dateArray[0]);
    let day = Number(dateArray[1].replace(',', ''));
    let year = Number(dateArray[2]);
    const jobDate = new Date();
    jobDate.setFullYear(year);
    jobDate.setMonth(month);
    jobDate.setDate(day);
    return jobDate;
  }

  return undefined;
}
