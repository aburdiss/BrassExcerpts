import { useContext } from 'react';
import { useDarkMode } from '../useDarkMode/useDarkMode';
import { PreferencesContext } from '../../../Model/Preferences';

export function useTheme() {
  const { state } = useContext(PreferencesContext);
  const darkMode = useDarkMode();

  if (state == undefined) {
    return 'light';
  } else {
    if (state.theme == 'default') {
      return darkMode ? 'dark' : 'light';
    } else {
      return state.theme;
    }
  }
}
