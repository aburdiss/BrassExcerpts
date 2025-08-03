import { shuffle } from '../../../../utils/shuffle/shuffle';

import { excerpts as hornExcerpts } from '../../../../Model/Excerpts/HornExcerpts';
import { excerpts as trumpetExcerpts } from '../../../../Model/Excerpts/TrumpetExcerpts';
import { excerpts as tromboneExcerpts } from '../../../../Model/Excerpts/TromboneExcerpts';
import { excerpts as tubaExcerpts } from '../../../../Model/Excerpts/TubaExcerpts';
import { Instrument } from '../../../../Enums/instrument';

/**
 * @todo Make work with only favorites as well
 *
 * @function generateRandomExcerpt
 * @memberof randomExcerpt
 * @description Takes the state, and generates a random excerpt that is
 * different from the one that is currently showing.
 * Created 5/4/21
 * @param {Object} state The user state returned from the PreferencesContext
 * @param {Function} setComposition A function to call with the randomly
 * selected composition
 * @param {Function} setExcerpt A function to call with the randomly selected
 * excerpt from the composition.
 * @param {Function} setPartIndex A function to call with the randomly
 * selected part index from the excerpt from the composition.
 * @param {Object} composition The current composition object that is showing,
 * so that no duplicates are shown.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function generateRandomExcerpt(
  state,
  setComposition,
  setExcerptIndex,
  setPartIndex,
  composition,
) {
  if (state.randomFavorites == 0) {
    let randomComposition;
    let randomCompositionKey;
    let randomExcerptIndex;
    let randomPartIndex;
    let possibleCompositions = [];

    // Get possible excerpts here.
    for (let excerpt of state.favorites) {
      if (state.randomHorn && excerpt.startsWith(Instrument.Horn)) {
        possibleCompositions.push(excerpt);
      } else if (
        state.randomTrumpet &&
        excerpt.startsWith(Instrument.Trumpet)
      ) {
        possibleCompositions.push(excerpt);
      } else if (
        state.randomTrombone &&
        excerpt.startsWith(Instrument.Trombone)
      ) {
        possibleCompositions.push(excerpt);
      } else if (state.randomTuba && excerpt.startsWith(Instrument.Tuba)) {
        possibleCompositions.push(excerpt);
      }
    }

    if (possibleCompositions.length > 1) {
      do {
        possibleCompositions = shuffle(possibleCompositions);
      } while (
        possibleCompositions[0].includes(composition?.name) //||
        // @todo Deal with the following
        // possibleCompositions[0].excerpts[0].pictures[0][1] === 'none.png'
      );
    }

    randomCompositionKey = possibleCompositions[0];

    if (randomCompositionKey.startsWith(Instrument.Horn)) {
      randomComposition = hornExcerpts.find(
        (excerpt) =>
          randomCompositionKey.includes(excerpt.name) &&
          randomCompositionKey.includes(excerpt.composerLast),
      );
    } else if (randomCompositionKey.startsWith(Instrument.Trumpet)) {
      randomComposition = trumpetExcerpts.find(
        (excerpt) =>
          randomCompositionKey.includes(excerpt.name) &&
          randomCompositionKey.includes(excerpt.composerLast),
      );
    } else if (randomCompositionKey.startsWith(Instrument.Trombone)) {
      randomComposition = tromboneExcerpts.find(
        (excerpt) =>
          randomCompositionKey.includes(excerpt.name) &&
          randomCompositionKey.includes(excerpt.composerLast),
      );
    } else if (randomCompositionKey.startsWith(Instrument.Tuba)) {
      randomComposition = tubaExcerpts.find(
        (excerpt) =>
          randomCompositionKey.includes(excerpt.name) &&
          randomCompositionKey.includes(excerpt.composerLast),
      );
    }

    randomExcerptIndex = Math.floor(
      Math.random() * randomComposition.excerpts.length,
    );

    randomPartIndex = Math.floor(
      Math.random() *
        randomComposition.excerpts[randomExcerptIndex].pictures.length,
    );

    setComposition(randomComposition);
    setExcerptIndex(randomExcerptIndex);
    setPartIndex(randomPartIndex);
  } else {
    let possibleInstruments = [];
    let randomSelectedInstrument;
    let randomComposition;
    let randomExcerptIndex;
    let randomPartIndex;
    let possibleCompositions;
    const excerpts = {
      [Instrument.Horn]: hornExcerpts,
      [Instrument.Trumpet]: trumpetExcerpts,
      [Instrument.Trombone]: tromboneExcerpts,
      [Instrument.Tuba]: tubaExcerpts,
    };
    if (state.randomHorn) {
      possibleInstruments.push(Instrument.Horn);
    }
    if (state.randomTrumpet) {
      possibleInstruments.push(Instrument.Trumpet);
    }
    if (state.randomTrombone) {
      possibleInstruments.push(Instrument.Trombone);
    }
    if (state.randomTuba) {
      possibleInstruments.push(Instrument.Tuba);
    }

    if (possibleInstruments.length === 1) {
      randomSelectedInstrument = possibleInstruments[0];
    } else {
      if (possibleInstruments.length === 0) {
        possibleInstruments = Object.values(Instrument);
      }
      possibleInstruments = shuffle(possibleInstruments);
      randomSelectedInstrument = possibleInstruments[0];
    }

    possibleCompositions = excerpts[randomSelectedInstrument];
    do {
      possibleCompositions = shuffle(possibleCompositions);
    } while (
      possibleCompositions[0].name === composition?.name ||
      possibleCompositions[0].excerpts[0].pictures[0][1] === 'none.png'
    );
    randomComposition = possibleCompositions[0];

    randomExcerptIndex = Math.floor(
      Math.random() * randomComposition.excerpts.length,
    );

    randomPartIndex = Math.floor(
      Math.random() *
        randomComposition.excerpts[randomExcerptIndex].pictures.length,
    );

    setComposition(randomComposition);
    setExcerptIndex(randomExcerptIndex);
    setPartIndex(randomPartIndex);
  }
}
