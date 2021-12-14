// @ts-check
import { useQuery } from 'react-query';

import { fetchInstrumentJobs } from '../../fetchInstrumentJobs/fetchInstrumentJobs';
import { processTopExcerpts } from './processTopExcerpts/processTopExcerpts';

/**
 * @function getTopExcerpts
 * @description Gets the top excerpts from the app.
 * @param {string} instrument
 * @returns {object} An array containing objects with the name of each excerpt
 * and the count that it is found in the jobs.
 * @author Alexander Burdiss
 * @since 9/19/21
 * @version 1.1.2
 */
export function useTopExcerpts(instrument) {
  const desiredTopExcerpts = 10;

  const internalHornJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/HornJobs.json';
  const internalTrumpetJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TrumpetJobs.json';
  const internalTromboneJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TromboneJobs.json';
  const internalTubaJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TubaJobs.json';

  const queryPreferences = {
    staleTime: 1000 * 60 * 60, // One Hour
  };

  const hornJobs = useQuery(
    'hornJobs',
    () => fetchInstrumentJobs(internalHornJobsLink),
    queryPreferences,
  );
  const trumpetJobs = useQuery(
    'trumpetJobs',
    () => fetchInstrumentJobs(internalTrumpetJobsLink),
    queryPreferences,
  );
  const tromboneJobs = useQuery(
    'tromboneJobs',
    () => fetchInstrumentJobs(internalTromboneJobsLink),
    queryPreferences,
  );
  const tubaJobs = useQuery(
    'tubaJobs',
    () => fetchInstrumentJobs(internalTubaJobsLink),
    queryPreferences,
  );

  let jobs = {
    Horn: hornJobs,
    Trumpet: trumpetJobs,
    Trombone: tromboneJobs,
    Tuba: tubaJobs,
  }[instrument];

  return {
    loading: jobs.isLoading,
    status: jobs.status,
    topExcerpts: processTopExcerpts(jobs).slice(0, desiredTopExcerpts),
  };
}
