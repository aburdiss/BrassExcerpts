import { UseQueryResult } from '@tanstack/react-query';

/**
 * @function processTopExcerpts
 * @description Takes a list of jobs returned from React Query, and parses
 * through them, returning a list of the jobs with the number of them present
 * in the auditions in this app attached on the object
 * Created 12/13/21
 * @param {Object} jobs The jobs object returned from React Query
 * @returns {Object[]} An array of all the temp
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function processTopExcerpts(
  jobs: UseQueryResult<{ excerpts: string[] }[], unknown>,
) {
  let tempExcerptsArray = [];

  let excerptsUsed = {} as Record<string, number>;
  if (jobs.isLoading || jobs.status == 'error' || jobs.data === undefined) {
    // Nothing
    return [];
  } else {
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

    for (const excerpt in excerptsUsed) {
      tempExcerptsArray.push({ name: excerpt, count: excerptsUsed[excerpt] });
    }

    tempExcerptsArray.sort((a, b) => b.count - a.count);
  }
  return tempExcerptsArray;
}
