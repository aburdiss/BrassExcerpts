/**
 * @function getInstrumentsSelected
 * @description Gets the current instruments selected from state.
 * Created 5/1/21
 * @param {Object} state The state object returned from the Preferences
 * Reducer
 * @returns {string} A comma separated, capitalized list of the instruments
 * that are selected in the users' settings.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function getInstrumentsSelected(state) {
  if (state) {
    let instruments = [];
    if (state.horn) {
      instruments.push('Horn');
    }
    if (state.trumpet) {
      instruments.push('Trumpet');
    }
    if (state.trombone) {
      instruments.push('Trombone');
    }
    if (state.tuba) {
      instruments.push('Tuba');
    }
    let string = instruments.join(', ');
    return string;
  }
}
