/**
 * @function getNumberOfInstruments
 * @description Returns the number of instruments selected in the MoreView
 * @param {Object} state The state object returned from PreferencesContext
 * @returns {Number} The number of Instruments currently selected on the more
 * screen.
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
