import { useContext } from 'react';

import {
  light,
  dark,
  dracula,
  monokai,
  solarizedLight,
  solarizedDark,
} from '../../../Model/Model';
import { PreferencesContext } from '../../../Model/Preferences';
import { Colors } from '../../../Types/colors';

/**
 * @function useColors
 * @description A custom hook that allows colors to be referenced directly from
 * the components instead of handling dark mode differently in each component.
 * Created 9/11/21
 * @returns {Object} A colors object from which colors can be referenced
 * directly
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 2.1.0
 */
export function useColors(): Colors {
  const { state } = useContext(PreferencesContext);
  if (!state.renderedTheme) {
    return light;
  }

  return (
    {
      default: light,
      light: light,
      dark: dark,
      dracula: dracula,
      monokai: monokai,
      solarizedLight: solarizedLight,
      solarizedDark: solarizedDark,
    }[state.renderedTheme] ?? light
  );
}
