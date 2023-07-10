import { useContext } from 'react';
import { PreferencesContext } from '../../../Model/Preferences';

/**
 * @function useTheme
 * @description Returns the Rendered theme from the state context.
 * Created 12/6/21
 * @returns {Object} The current theme to use throughout the app
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 2.0.0
 */
export function useTheme() {
  const { state } = useContext(PreferencesContext);

  return state?.renderedTheme;
}
