/**
 * @function fetchInstrumentJobs
 * @description Takes a url, and returns the resolved promise from fetching that
 * data from the Github server
 * @param {String} link The link to use to fetch the jobs from the Github
 * server
 * @returns A resolved promise with the Job data inside.
 * @author Alexander Burdiss
 * @since 5/8/21
 * @version 1.0.0
 */
export async function fetchInstrumentJobs(link) {
  let response = await fetch(link);
  let data = await response.json();
  if (data.Jobs) {
    return data.Jobs;
  } else {
    return [];
  }
}
