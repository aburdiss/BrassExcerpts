/**
 * @function getDarkOrLightTheme
 * @description Returns "Dark" or "Light" whether the theme should be treated
 * as a dark or a light theme.
 * Created 9/25/21
 * @param {string} theme The current theme represented in string form.
 * @returns {string} Whether the theme should be treated as a dark or a light
 * theme.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.1.0
 */
export function getDarkOrLightTheme(theme) {
  switch (theme) {
    case 'light':
    case 'solarizedLight':
      return 'light';
    default:
      return 'dark';
  }
}
