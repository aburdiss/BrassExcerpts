import { useContext, useEffect, useState } from 'react';

import { useDarkMode } from '../useDarkMode/useDarkMode';
import { light, dark, dracula } from '../../../Model/Model';
import { PreferencesContext } from '../../../Model/Preferences';

/**
 * @function useColors
 * @description A custom hook that allows colors to be referenced directly from
 * the components instead of handling dark mode differently in each component.
 * @returns {Object} A colors object from which colors can be referenced
 * directly
 * @author Alexander Burdiss
 * @since 9/11/21
 * @version 1.0.0
 */
export function useColors() {
  const [theme, setTheme] = useState(light);
  const { state } = useContext(PreferencesContext);
  const darkMode = useDarkMode();

  useEffect(() => {
    if (state == undefined) {
      setTheme(light);
    } else {
      if (state.theme == 'dark') {
        setTheme(dark);
      } else if (state.theme == 'light') {
        setTheme(light);
      } else if (state.theme == 'dracula') {
        setTheme(dracula);
      } else {
        const newTheme = darkMode ? dark : light;
        setTheme(newTheme);
      }
    }
  }, [state, darkMode]);

  return theme;
}
