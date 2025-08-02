import { isDateAfterToday } from '../../../../utils/isDateAfterToday/isDateAfterToday';
import {
  fromNullable,
  left,
  right,
} from '../../../../utils/monads/either/either';

/**
 * @function isValidSearchResult
 * @memberof Jobs
 * @description Determines whether the passed in job is a valid search result
 * Created 9/18/21
 * @param {Object} job A job object fetched from the server
 * @returns {"right"|"left"} An either monad. right(job) if the job is valid,
 * left(null) if it is not.
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 2.0.0
 */
function isValidSearchResult(job: Object, currentSearchTerm: String) {
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
 * @memberof Jobs
 * @description Checks the date of the job to see if it is valid
 * Created 10/22/21
 * @param {Object} job A job object fetched from the server.
 * @returns {"right"|"left"} An Either monad. right(job) if the job is valid,
 * left(null) if not.
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
function isJobValid(job) {
  const jobInFuture = isDateAfterToday(job.closingDate);
  return jobInFuture ? right(job) : left(null);
}

/**
 * @function getValidJobs
 * @memberof Jobs
 * @description Filters a list of all jobs into a list of valid jobs
 * Created 10/22/21
 * @param {Object[]} jobList A list of jobs returned from the API.
 * @returns {Object[]} A list of whether the job should display
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
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
