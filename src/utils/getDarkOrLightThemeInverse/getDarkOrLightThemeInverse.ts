import { LightOrDarkTheme, Themes } from '../../Enums/themes';
import { getDarkOrLightTheme } from '../getDarkOrLightTheme/getDarkOrLightTheme';

/**
 * @function getDarkOrLightThemeInverse
 * @description Returns "Dark" or "Light" whether the theme opposite of what the
 * theme would be considered.
 * Created 9/25/21
 * @param {Themes} theme The current theme represented in string form.
 * @returns {LightOrDarkTheme} The opposite of whether the theme should be considered a
 * light or dark theme.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function getDarkOrLightThemeInverse(theme: Themes) {
  const processedTheme = getDarkOrLightTheme(theme);
  if (processedTheme == LightOrDarkTheme.light) {
    return LightOrDarkTheme.dark;
  } else {
    return LightOrDarkTheme.light;
  }
}
