/**
 * @function rgbToHex
 * @see https://stackoverflow.com/questions/13070054/convert-rgb-strings-to-hex-in-javascript
 * @param {string} rgbString The RGB string to parse into a hex color
 * @returns {string} The hex verison of the inputted rgb color
 * @author Alexander Burdiss
 * @since 9/17/21
 * @version 1.0.0
 */
export function rgbToHex(rgbString) {
  const commaSeparatedColors = rgbString.split('(')[1].split(')')[0];
  const colorList = commaSeparatedColors.split(',');
  const base16Colors = colorList.map(function (color) {
    // For each array element
    // Convert to a base16 string
    const parsedColor = parseInt(color, 10).toString(16);
    // Add zero if we get only one character
    return parsedColor.length == 1 ? '0' + parsedColor : parsedColor;
  });
  const hex = '#' + base16Colors.join('');
  return hex;
}
