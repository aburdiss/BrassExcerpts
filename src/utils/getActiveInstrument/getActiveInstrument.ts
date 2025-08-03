import { Instrument } from '../../Enums/instrument';
import { Preferences } from '../../Types/preferences';

/**
 * @function getActiveInstrument
 * @description Returns the Active Instrument if only one is active. If more
 * than one are active, returns the first active instrument.
 * Created 4/20/21
 * @param {Object} state The state object returned from PreferencesContext
 * @returns {string|undefined} The active instrument in all lowercase. If no
 * instruments are active, returns undefined
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function getActiveInstrument(state: Preferences) {
  if (state.horn) {
    return Instrument.Horn;
  } else if (state.trumpet) {
    return Instrument.Trumpet;
  } else if (state.trombone) {
    return Instrument.Trombone;
  } else if (state.tuba) {
    return Instrument.Tuba;
  } else {
    return undefined;
  }
}
