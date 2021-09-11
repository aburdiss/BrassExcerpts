import { useColorScheme } from 'react-native';

/**
 * @function useDarkMode
 * @description A custom hook that returns whether the user has selected dark
 * mode in their settings or not.
 * @returns {boolean} Whether or not the user has selected Dark Mode in their
 * settings
 * @author Alexander Burdiss
 * @since 9/11/21
 * @version 1.0.0
 */
export function useDarkMode() {
  const colorScheme = useColorScheme();
  return colorScheme == 'dark';
}
