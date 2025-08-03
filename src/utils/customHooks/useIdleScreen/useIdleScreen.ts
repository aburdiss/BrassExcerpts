import { useEffect, useContext } from 'react';
import IdleTimerManager from 'react-native-idle-timer';

import { PreferencesContext } from '../../../Model/Preferences';

/**
 * @function useIdleScreen
 * @description Turns the screen timer off or on, depending on what the user
 * has selected in preferences. If the user has no preference set, this will
 * default to false, not adjusting the screen timer settings.
 * Created 7/6/21
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.1
 */
export function useIdleScreen() {
  const { state } = useContext(PreferencesContext);

  useEffect(
    function setupIdleScreenPreferences() {
      if (state?.keepScreenOn) {
        IdleTimerManager.setIdleTimerDisabled(true);
      } else {
        IdleTimerManager.setIdleTimerDisabled(false);
      }

      return () => {
        IdleTimerManager.setIdleTimerDisabled(false);
      };
    },
    [state.keepScreenOn],
  );
}
