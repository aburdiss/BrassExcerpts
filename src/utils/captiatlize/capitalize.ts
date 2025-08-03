/**
 * @function capitalize
 * @description Capitalizes the first letter of the string passed in.
 * Created 9/11/21
 * @param {string} inputString
 * @returns {string} The input string with the first letter capitalized
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function capitalize(inputString: string): string {
  if (typeof inputString !== 'string') {
    return '';
  }
  const firstLetter = inputString[0];
  const restOfString = inputString.slice(1);
  return `${firstLetter.toUpperCase()}${restOfString}`;
}
