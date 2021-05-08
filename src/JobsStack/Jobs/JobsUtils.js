import {Linking} from 'react-native';

/**
 * @function isJobValidReducer
 * @see hasValidJobs
 * @description A reducer that when called on a jobs API return object, will
 * return true if any of them have a closing date past today, and false
 * otherwise.
 * @param {Boolean} areAnyJobsValid A flag that determines if any jobs have
 * been found that have a closing date after today.
 * @param {Object} thisJob The current job being evaluated
 * @returns {Boolean} A running flag if any jobs have been found yet that are
 * valid.
 * @author Alexander Burdiss
 * @since 5/8/21
 * @version 1.0.0
 */
function isJobValidReducer(areAnyJobsValid, thisJob) {
  if (areAnyJobsValid) {
    return true;
  }

  const jobDate = new Date(thisJob.closingDate);
  if (jobDate > new Date()) {
    return true;
  }

  return false;
}

/**
 * @function hasValidJobs
 * @description Checks the list of jobs passed in and returns true if any jobs
 * have a closing date after today.
 * @param {Object[]} jobList A list of jobs returned from the API.
 * @returns {Boolean} Whether or not any of the Jobs have a closing date
 * after today.
 * @author Alexander Burdiss
 * @since 5/8/21
 * @version 1.0.0
 */
export function hasValidJobs(jobList) {
  if (jobList && jobList.length != 0) {
    const validJobs = jobList.reduce(isJobValidReducer, false);
    return validJobs;
  } else {
    return false;
  }
}

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

/**
 * @function openMusicalChairsLink
 * @description Opens the appropriate musical chair link based on the job
 * instrument that is selected
 * @param {Object} state The state object stored in PreferencesReducer
 * @author Alexander Burdiss
 * @since 5/8/21
 * @version 1.0.0
 */
export function openMusicalChairsLink(state) {
  const musicalChairsHornLink = 'https://www.musicalchairs.info/horn/jobs';
  const musicalChairsTrumpetLink =
    'https://www.musicalchairs.info/trumpet/jobs';
  const musicalChairsTromboneLink =
    'https://www.musicalchairs.info/trombone/jobs';
  const musicalChairsTubaLink = 'https://www.musicalchairs.info/tuba/jobs';

  let urlToOpen = [
    musicalChairsHornLink,
    musicalChairsTrumpetLink,
    musicalChairsTromboneLink,
    musicalChairsTubaLink,
  ][state.jobsIndex];

  Linking.openURL(urlToOpen).catch((err) =>
    console.warn("Couldn't load page", err),
  );
}
