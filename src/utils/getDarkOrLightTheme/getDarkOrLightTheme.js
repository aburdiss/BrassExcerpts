/**
 * @function getDarkOrLightTheme
 * @description Returns "Dark" or "Light" whether the theme should be treated
 * as a dark or a light theme.
 * @param {string} theme The current theme represented in string form.
 * @returns {string} Whether the theme should be treated as a dark or a light
 * theme.
 * @author Alexander Burdiss
 * @since 9/25/21
 * @version 1.1.0
 */
export function getDarkOrLightTheme(theme) {
  switch (theme) {
    case 'light':
      return 'light';
    default:
      return 'dark';
  }
}
