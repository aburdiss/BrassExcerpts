import { isDateAfterToday } from '../../../../utils/isDateAfterToday/isDateAfterToday';
import {
  fromNullable,
  left,
  right,
} from '../../../../utils/monads/either/either';

/**
 * @function isValidSearchResult
 * @param {Object} job A job object fetched from the server
 * @returns {right|left} An either monad. right(job) if the job is valid,
 * left(null) if it is not.
 * @author Alexander Burdiss
 * @since 9/18/21
 * @version 2.0.0
 */
function isValidSearchResult(job, currentSearchTerm) {
  if (!currentSearchTerm) {
    return right(job);
  }

  if (
    job.auditionDate.toLowerCase().includes(currentSearchTerm) ||
    job.closingDate.toLowerCase().includes(currentSearchTerm) ||
    job.country.toLowerCase().includes(currentSearchTerm) ||
    job.orchestra.toLowerCase().includes(currentSearchTerm) ||
    job.position.toLowerCase().includes(currentSearchTerm)
  ) {
    return right(job);
  }

  return left(null);
}

/**
 * @function isJobValid
 * @description Checks the date of the job to see if it is valid
 * @param {Object} job A job object fetched from the server.
 * @returns {right|left} An Either monad. right(job) if the job is valid,
 * left(null) if not.
 * @author Alexander Burdiss
 * @since 10/22/21
 * @version 1.0.0
 */
function isJobValid(job) {
  const jobInFuture = isDateAfterToday(job.closingDate);
  return jobInFuture ? right(job) : left(null);
}

/**
 * @function getValidJobs
 * @description Filters a list of all jobs into a list of valid jobs
 * @param {Object[]} jobList A list of jobs returned from the API.
 * @returns {Object[]} A list of whether the job should display
 * @author Alexander Burdiss
 * @since 10/22/21
 * @version 1.0.0
 */
export function getValidJobs(jobList, currentSearchTerm) {
  const validJobs = [];

  if (jobList?.length) {
    jobList.map((job) => {
      fromNullable(job)
        .chain(isJobValid)
        .chain((j) => isValidSearchResult(j, currentSearchTerm))
        .fold(
          () => {},
          (j) => validJobs.push(j),
        );
    });
  }

  return validJobs;
}
