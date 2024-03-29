import { rgbToHex } from '../rgbToHex/rgbToHex';

/**
 * @function getContrast
 * @description Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @see https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
 * @param  {String} hexcolor A hexcolor value
 * @return {String} The contrasting color (black or white)
 * @since July 16, 2019
 * @author Chris Ferdinandi
 * @author Alexander Burdiss
 * @version 1.0.0
 */
export function getContrast(backgroundColor, colors) {
  let hexcolor;

  // ensure that the color is a hex
  if (backgroundColor?.startsWith('rgb')) {
    hexcolor = rgbToHex(backgroundColor);
  } else if (backgroundColor?.startsWith('#')) {
    hexcolor = backgroundColor;
  } else {
    return colors.alwaysBlack;
  }

  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split('')
      .map(function (hex) {
        return hex + hex;
      })
      .join('');
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? colors.alwaysBlack : colors.alwaysWhite;
}
