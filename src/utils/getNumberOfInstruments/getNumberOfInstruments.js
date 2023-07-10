/**
 * @function getNumberOfInstruments
 * @description Returns the number of instruments selected in the MoreView
 * Created 4/30/21
 * @param {Object} state The state object returned from PreferencesContext
 * @returns {number} The number of Instruments currently selected on the more
 * screen.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
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
