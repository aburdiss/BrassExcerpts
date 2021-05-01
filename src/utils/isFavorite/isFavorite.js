/**
 * @function isFavorite
 * @description Checks to see if the composition is favorited by any instrument
 * that is active.
 * @author Alexander Burdiss
 * @since 5/1/21
 * @version 1.0.0
 * @param {Object} state The state object returned by PreferencesContext
 * @param {String} composer The last name of the composer to check
 * @param {String} composition The composition Name to check
 * @returns {Boolean} Whether the composition is favorited by any instrument
 * that is active
 */
export function isFavorite(state, composer, composition) {
  const hornKey = 'horn' + composer + composition;
  const trumpetKey = 'trumpet' + composer + composition;
  const tromboneKey = 'trombone' + composer + composition;
  const tubaKey = 'tuba' + composer + composition;

  let keyArray = [];
  state.horn && keyArray.push(hornKey);
  state.trumpet && keyArray.push(trumpetKey);
  state.trombone && keyArray.push(tromboneKey);
  state.tuba && keyArray.push(tubaKey);

  for (let key of keyArray) {
    if (state?.favorites.includes(key)) {
      return true;
    }
  }
  return false;
}
