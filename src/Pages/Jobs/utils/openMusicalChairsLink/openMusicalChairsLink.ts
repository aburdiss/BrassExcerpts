import { Linking } from 'react-native';
import { Instrument } from '../../../../Enums/instrument';
import { Preferences } from '../../../../Types/preferences';

/**
 * @function openMusicalChairsLink
 * @memberof Jobs
 * @description Opens the appropriate musical chair link based on the job
 * instrument that is selected
 * Created 5/8/21
 * @param {Object} state The state object stored in PreferencesReducer
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.1
 */
export function openMusicalChairsLink(state: Preferences) {
  const musicalChairsHornLink =
    'https://www.musicalchairs.info/french-horn/jobs';
  const musicalChairsTrumpetLink =
    'https://www.musicalchairs.info/trumpet/jobs';
  const musicalChairsTromboneLink =
    'https://www.musicalchairs.info/trombone/jobs';
  const musicalChairsTubaLink = 'https://www.musicalchairs.info/tuba/jobs';

  let urlToOpen = {
    [Instrument.Horn]: musicalChairsHornLink,
    [Instrument.Trumpet]: musicalChairsTrumpetLink,
    [Instrument.Trombone]: musicalChairsTromboneLink,
    [Instrument.Tuba]: musicalChairsTubaLink,
  }[state.jobsInstrument];

  Linking.openURL(urlToOpen).catch((err) =>
    console.warn("Couldn't load page", err),
  );
}
