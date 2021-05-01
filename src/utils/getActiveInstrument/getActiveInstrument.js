/**
 * @function getActiveInstrument
 * @description Returns the Active Instrument if only one is active. If more
 * than one are active, returns the first active instrument.
 * @author Alexander Burdiss
 * @since 4/30/21
 * @version 1.0.0
 * @param {Object} state The state object returned from PreferencesContext
 * @returns {String|undefined} The active instrument in all lowercase. If no
 * instruments are active, returns undefined
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
