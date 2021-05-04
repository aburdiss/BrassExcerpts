import {shuffle} from 'underscore';
import {capitalize} from 'underscore.string';

import {excerpts as hornExcerpts} from '../../Model/Excerpts/HornExcerpts';
import {excerpts as trumpetExcerpts} from '../../Model/Excerpts/TrumpetExcerpts';
import {excerpts as tromboneExcerpts} from '../../Model/Excerpts/TromboneExcerpts';
import {excerpts as tubaExcerpts} from '../../Model/Excerpts/TubaExcerpts';

/**
 * @todo Make work with only favorites as well
 *
 * @param {*} state
 * @param {*} setInstrument
 * @param {*} setComposition
 * @param {*} setExcerpt
 * @param {*} setPartIndex
 * @param {*} composition
 */
export function generateRandomExcerpt(
  state,
  setInstrument,
  setComposition,
  setExcerptIndex,
  setPartIndex,
  composition,
) {
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

  setInstrument(capitalize(randomSelectedInstrument));
  setComposition(randomComposition);
  setExcerptIndex(randomExcerptIndex);
  setPartIndex(randomPartIndex);
}
