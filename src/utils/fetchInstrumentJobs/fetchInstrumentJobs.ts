/**
 * @function fetchInstrumentJobs
 * @description Takes a url, and returns the resolved promise from fetching that
 * data from the Github server
 * Created 5/8/21
 * @param {string} link The link to use to fetch the jobs from the Github
 * server
 * @returns {Object[]} A resolved promise with the Job data inside.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export async function fetchInstrumentJobs(link: string) {
  let response = await fetch(link);
  let data = await response.json();
  if (data.Jobs) {
    return data.Jobs;
  } else {
    return [];
  }
}
