import { useDarkMode } from '../useDarkMode/useDarkMode';
import { light, dark } from '../../../Model/Model';

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
  const darkMode = useDarkMode();
  return darkMode ? dark : light;
}
