import hornJobs from './HornJobs.json';
import tromboneJobs from './TromboneJobs.json';
import trumpetJobs from './TrumpetJobs.json';
import tubaJobs from './TubaJobs.json';

describe('Horn jobs have valid dates', () => {
  hornJobs.Jobs.map((job) => {
    describe(job.orchestra, () => {
      validateDate(job.closingDate, 'closingDate');
      validateDate(job.auditionDate, 'auditionDate');
    });
  });
});

describe('Trombone jobs have valid dates', () => {
  tromboneJobs.Jobs.map((job) => {
    describe(job.orchestra, () => {
      validateDate(job.closingDate, 'closingDate');
      validateDate(job.auditionDate, 'auditionDate');
    });
  });
});

describe('Trumpet jobs have valid dates', () => {
  trumpetJobs.Jobs.map((job) => {
    describe(job.orchestra, () => {
      validateDate(job.closingDate, 'closingDate');
      validateDate(job.auditionDate, 'auditionDate');
    });
  });
});

describe('Tuba jobs have valid dates', () => {
  tubaJobs.Jobs.map((job) => {
    describe(job.orchestra, () => {
      validateDate(job.closingDate, 'closingDate');
      validateDate(job.auditionDate, 'auditionDate');
    });
  });
});

/**
 * @function validateDate
 * @description Runs Jest tests on a single date. Split out so that this can be
 * ran against all different dates in Job tests.
 * @param {string} date The date to validate
 * @param {string} testName The name of the test (audition date or closing date)
 * @author Alexander Burdiss
 * @since 9/4/21
 * @version 1.0.0
 */
function validateDate(date, testName) {
  if (date === '') {
    return;
  }

  date = date.split(' ');
  const month = date[0];
  const day = date[1].replace(',', '');
  const year = date[2];

  test(testName + ' month', () => {
    const validMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIsValid = validMonths.includes(month);
    expect(monthIsValid).toBeTruthy();
  });
  test(testName + ' day is number', () => {
    const numberDay = Number(day);
    expect(numberDay).not.toBeNaN();
  });
  test(testName + ' year is 4 digits', () => {
    const yearLength = year.length;
    expect(yearLength).toEqual(4);
  });
  test(testName + ' year is number', () => {
    const numberYear = Number(year);
    expect(numberYear).not.toBeNaN();
  });
}
