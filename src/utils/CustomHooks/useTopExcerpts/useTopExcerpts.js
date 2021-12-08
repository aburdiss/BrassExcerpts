import { useQuery } from 'react-query';

import { fetchInstrumentJobs } from '../../fetchInstrumentJobs/fetchInstrumentJobs';

/**
 * @function getTopExcerpts
 * @description Gets the top excerpts from the app.
 * @param {string} instrument
 * @returns {Object[]} An array containing objects with the name of each excerpt
 * and the count that it is found in the jobs.
 * @author Alexander Burdiss
 * @since 9/19/21
 * @version 1.1.0
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

  if (jobs.isLoading) {
    return undefined;
  }

  if (jobs.status === 'error') {
    return undefined;
  }

  let excerptsUsed = {};

  console.log(jobs);

  for (const job of jobs.data) {
    if (job?.excerpts?.length > 0) {
      for (let excerpt of job.excerpts) {
        if (excerptsUsed[excerpt] == undefined) {
          excerptsUsed[excerpt] = 1;
        } else {
          excerptsUsed[excerpt]++;
        }
      }
    }
  }

  let excerptsArray = [];

  for (const excerpt in excerptsUsed) {
    excerptsArray.push({ name: excerpt, count: excerptsUsed[excerpt] });
  }

  excerptsArray.sort((a, b) => b.count - a.count);
  return excerptsArray.slice(0, desiredTopExcerpts);
}
