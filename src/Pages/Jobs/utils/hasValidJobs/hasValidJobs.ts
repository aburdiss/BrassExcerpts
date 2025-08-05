import { getDateFromString } from '../../../../utils/getDateFromString/getDateFromString';

/**
 * @function isJobValidReducer
 * @memberof Jobs
 * @description A reducer that when called on a jobs API return object, will
 * return true if any of them have a closing date past today, and false
 * otherwise.
 * Created 5/8/21
 * @param {boolean} areAnyJobsValid A flag that determines if any jobs have
 * been found that have a closing date after today.
 * @param {Object} thisJob The current job being evaluated
 * @returns {boolean} A running flag if any jobs have been found yet that are
 * valid.
 * @see hasValidJobs
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.1
 */
function isJobValidReducer(areAnyJobsValid: Boolean, thisJob: Object) {
  if (areAnyJobsValid) {
    return true;
  }

  const jobDate = getDateFromString(thisJob.closingDate);

  if (jobDate > new Date()) {
    return true;
  }

  return false;
}

/**
 * @function hasValidJobs
 * @memberof Jobs
 * @description Checks the list of jobs passed in and returns true if any jobs
 * have a closing date after today.
 * Created 5/8/23
 * @param {Object[]} jobList A list of jobs returned from the API.
 * @returns {boolean} Whether or not any of the Jobs have a closing date
 * after today.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
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
