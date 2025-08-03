import { Instrument } from '../../Enums/instrument';
import { Preferences } from '../../Types/preferences';

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
export function getInstrumentsSelected(state: Preferences): string | undefined {
  if (state) {
    let instruments = [];
    if (state.horn) {
      instruments.push(Instrument.Horn);
    }
    if (state.trumpet) {
      instruments.push(Instrument.Trumpet);
    }
    if (state.trombone) {
      instruments.push(Instrument.Trombone);
    }
    if (state.tuba) {
      instruments.push(Instrument.Tuba);
    }
    let string = instruments.join(', ');
    return string;
  }
}
