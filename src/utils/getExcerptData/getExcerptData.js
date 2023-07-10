import { excerpts as hornExcerpts } from '../../Model/Excerpts/HornExcerpts';
import { excerpts as trumpetExcerpts } from '../../Model/Excerpts/TrumpetExcerpts';
import { excerpts as tromboneExcerpts } from '../../Model/Excerpts/TromboneExcerpts';
import { excerpts as tubaExcerpts } from '../../Model/Excerpts/TubaExcerpts';

/**
 * @function getExcerptData
 * @description Gets the excerpt data from the appropriate data file, depending
 * on the instrument passed in.
 * Created 9/11/21
 * @param {string} instrument The instrument to gather the data from
 * @param {string} excerptName The name of the excerpt to gather data from
 * @returns {Object|null} The object with the excerpt data, or null if it
 * doesn't exist
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function getExcerptData(instrument, excerptName) {
  const excerptData = {
    horn: hornExcerpts,
    trumpet: trumpetExcerpts,
    trombone: tromboneExcerpts,
    tuba: tubaExcerpts,
  }[instrument].find((modelExcerpt) => {
    return modelExcerpt.videos == excerptName;
  });

  return excerptData ?? null;
}
