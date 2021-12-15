import { daysToMilliseconds } from '../../../../utils/daysToMilliseconds/daysToMilliseconds';
import { hasValidJobs } from './hasValidJobs';

describe('hasValidJobs returns correct value', () => {
  const monthNames = [
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

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setTime(yesterday.getTime() - daysToMilliseconds(1));
  const yesterdayDateString = `${
    monthNames[yesterday.getMonth()]
  } ${yesterday.getDate()}, ${yesterday.getFullYear()}`;
  const tomorrow = new Date(today);
  tomorrow.setTime(tomorrow.getTime() + daysToMilliseconds(1));
  const tomorrowDateString = `${
    monthNames[tomorrow.getMonth()]
  } ${tomorrow.getDate()}, ${tomorrow.getFullYear()}`;

  test('no jobs', () => {
    const mockJobs = undefined;
    const validJobs = hasValidJobs(mockJobs);
    expect(validJobs).toBeFalsy();
  });

  test('one valid job', () => {
    const mockJobs = [
      {
        closingDate: tomorrowDateString,
      },
    ];
    const validJobs = hasValidJobs(mockJobs);

    expect(validJobs).toBeTruthy();
  });

  test('one invalid job', () => {
    const mockJobs = [
      {
        closingDate: yesterdayDateString,
      },
    ];
    const validJobs = hasValidJobs(mockJobs);
    expect(validJobs).toBeFalsy();
  });

  test('one valid, one invalid job', () => {
    const mockJobs = [
      {
        closingDate: yesterdayDateString,
      },
      {
        closingDate: tomorrowDateString,
      },
    ];
    const validJobs = hasValidJobs(mockJobs);
    expect(validJobs).toBeTruthy();
  });
});
