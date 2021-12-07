import { useContext } from 'react';
import { PreferencesContext } from '../../../Model/Preferences';

/**
 * @function useTheme
 * @description Returns the Rendered theme from the state context.
 * @author Alexander Burdiss
 * @since 12/6/21
 * @version 2.0.0
 */
export function useTheme() {
  const { state } = useContext(PreferencesContext);

  return state?.renderedTheme;
}
