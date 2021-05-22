/**
 * @function getInstrumentsSelected
 * @description Gets the current instruments selected from state.
 * @param {Object} state The state object returned from the Preferences
 * Reducer
 * @returns {String} A comma separated, capitalized list of the instruments
 * that are selected in the users' settings.
 * @author Alexander Burdiss
 * @since 5/1/21
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
