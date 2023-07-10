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
export function getActiveInstrument(state) {
  if (state.horn) {
    return 'horn';
  } else if (state.trumpet) {
    return 'trumpet';
  } else if (state.trombone) {
    return 'trombone';
  } else if (state.tuba) {
    return 'tuba';
  } else {
    return undefined;
  }
}
