// @ts-check
/**
 * @function processTopExcerpts
 * @description Takes a list of jobs returned from React Query, and parses
 * through them, returning a list of the jobs with the number of them present
 * in the auditions in this app attached on the object
 * @param {object} jobs The jobs object returned from React Query
 * @returns {object[]} An array of all the temp
 * @author Alexander Burdiss
 * @since 12/13/21
 * @version 1.0.0
 */
export function processTopExcerpts(jobs) {
  let tempExcerptsArray = [];

  let excerptsUsed = {};
  if (jobs.isLoading || jobs.status == 'error') {
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
