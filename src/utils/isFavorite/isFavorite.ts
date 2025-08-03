import { Instrument } from '../../Enums/instrument';
import { Preferences } from '../../Types/preferences';

/**
 * @function isFavorite
 * @description Checks to see if the composition is favorited by any instrument
 * that is active.
 * Created 5/1/21
 * @param {Object} state The state object returned by PreferencesContext
 * @param {string} composer The last name of the composer to check
 * @param {string} composition The composition Name to check
 * @returns {boolean} Whether the composition is favorited by any instrument
 * that is active
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function isFavorite(
  state: Preferences,
  composer: string,
  composition: string,
) {
  const hornKey = Instrument.Horn + composer + composition;
  const trumpetKey = Instrument.Trumpet + composer + composition;
  const tromboneKey = Instrument.Trombone + composer + composition;
  const tubaKey = Instrument.Tuba + composer + composition;

  let keyArray = [];
  state?.horn && keyArray.push(hornKey);
  state?.trumpet && keyArray.push(trumpetKey);
  state?.trombone && keyArray.push(tromboneKey);
  state?.tuba && keyArray.push(tubaKey);

  for (let key of keyArray) {
    if (state?.favorites.includes(key)) {
      return true;
    }
  }
  return false;
}
