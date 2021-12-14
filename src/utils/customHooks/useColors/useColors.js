import { useContext } from 'react';

import { light, dark, dracula, monokai } from '../../../Model/Model';
import { PreferencesContext } from '../../../Model/Preferences';

/**
 * @function useColors
 * @description A custom hook that allows colors to be referenced directly from
 * the components instead of handling dark mode differently in each component.
 * @returns {Object} A colors object from which colors can be referenced
 * directly
 * @author Alexander Burdiss
 * @since 9/11/21
 * @version 2.1.0
 */
export function useColors() {
  const { state } = useContext(PreferencesContext);

  return (
    {
      light: light,
      dark: dark,
      dracula: dracula,
      monokai: monokai,
    }[state?.renderedTheme] ?? light
  );
}
