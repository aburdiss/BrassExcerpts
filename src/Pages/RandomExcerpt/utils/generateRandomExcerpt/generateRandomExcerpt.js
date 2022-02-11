import { shuffle } from '../../../../utils/shuffle/shuffle';

import { excerpts as hornExcerpts } from '../../../../Model/Excerpts/HornExcerpts';
import { excerpts as trumpetExcerpts } from '../../../../Model/Excerpts/TrumpetExcerpts';
import { excerpts as tromboneExcerpts } from '../../../../Model/Excerpts/TromboneExcerpts';
import { excerpts as tubaExcerpts } from '../../../../Model/Excerpts/TubaExcerpts';

/**
 * @todo Make work with only favorites as well
 *
 * @function generateRandomExcerpt
 * @description Takes the state, and generates a random excerpt that is
 * different from the one that is currently showing.
 * @param {Object} state The user state returned from the PreferencesContext
 * @param {Function} setComposition A function to call with the randomly
 * selected composition
 * @param {Function} setExcerpt A function to call with the randomly selected
 * excerpt from the composition.
 * @param {Function} setPartIndex A function to call with the randomly
 * selected part index from the excerpt from the composition.
 * @param {Object} composition The current composition object that is showing,
 * so that no duplicates are shown.
 * @author Alexander Burdiss
 * @since 5/4/21
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
      if (state.randomHorn && excerpt.startsWith('horn')) {
        possibleCompositions.push(excerpt);
      } else if (state.randomTrumpet && excerpt.startsWith('trumpet')) {
        possibleCompositions.push(excerpt);
      } else if (state.randomTrombone && excerpt.startsWith('trombone')) {
        possibleCompositions.push(excerpt);
      } else if (state.randomTuba && excerpt.startsWith('tuba')) {
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

    if (randomCompositionKey.startsWith('horn')) {
      randomComposition = hornExcerpts.find(
        (excerpt) =>
          randomCompositionKey.includes(excerpt.name) &&
          randomCompositionKey.includes(excerpt.composerLast),
      );
    } else if (randomCompositionKey.startsWith('trumpet')) {
      randomComposition = trumpetExcerpts.find(
        (excerpt) =>
          randomCompositionKey.includes(excerpt.name) &&
          randomCompositionKey.includes(excerpt.composerLast),
      );
    } else if (randomCompositionKey.startsWith('trombone')) {
      randomComposition = tromboneExcerpts.find(
        (excerpt) =>
          randomCompositionKey.includes(excerpt.name) &&
          randomCompositionKey.includes(excerpt.composerLast),
      );
    } else if (randomCompositionKey.startsWith('tuba')) {
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
      horn: hornExcerpts,
      trumpet: trumpetExcerpts,
      trombone: tromboneExcerpts,
      tuba: tubaExcerpts,
    };
    if (state.randomHorn) {
      possibleInstruments.push('horn');
    }
    if (state.randomTrumpet) {
      possibleInstruments.push('trumpet');
    }
    if (state.randomTrombone) {
      possibleInstruments.push('trombone');
    }
    if (state.randomTuba) {
      possibleInstruments.push('tuba');
    }

    if (possibleInstruments.length === 1) {
      randomSelectedInstrument = possibleInstruments[0];
    } else {
      if (possibleInstruments.length === 0) {
        possibleInstruments = ['horn', 'trumpet', 'trombone', 'tuba'];
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
