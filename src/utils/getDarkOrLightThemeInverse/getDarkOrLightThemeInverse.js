import { getDarkOrLightTheme } from '../getDarkOrLightTheme/getDarkOrLightTheme';

/**
 * @function getDarkOrLightThemeInverse
 * @description Returns "Dark" or "Light" whether the theme opposite of what the
 * theme would be considered.
 * @param {string} theme The current theme represented in string form.
 * @returns {string} The opposite of whether the theme should be considered a
 * light or dark theme.
 * @author Alexander Burdiss
 * @since 9/25/21
 * @version 1.0.0
 */
export function getDarkOrLightThemeInverse(theme) {
  const processedTheme = getDarkOrLightTheme(theme);
  if (processedTheme == 'light') {
    return 'dark';
  } else {
    return 'light';
  }
}
