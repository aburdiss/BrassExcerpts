/**
 * @function getNumberOfInstruments
 * @description Returns the number of instruments selected in the MoreView
 * @param {Object} state The state object returned from PreferencesContext
 * @returns {Number} The number of Instruments currently selected on the more
 * screen.
 * @author Alexander Burdiss
 * @since 4/30/21
 * @version 1.0.0
 */
export function getNumberOfInstruments(state) {
  let count = 0;
  if (state.horn) {
    count++;
  }
  if (state.trumpet) {
    count++;
  }
  if (state.trombone) {
    count++;
  }
  if (state.tuba) {
    count++;
  }
  return count;
}
